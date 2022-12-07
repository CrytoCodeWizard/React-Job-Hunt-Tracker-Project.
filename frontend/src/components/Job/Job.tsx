import { Dispatch, useState } from "react";
import { JobsAPIResponse } from "../../api/interfaces/jobs";
import { JobsAPI } from "../../api/jobs";
import useAppStore from "../../store/store";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Flex,
  Text,
  Box,
  HStack,
  useToast,
  useMediaQuery,
  Stack,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import useCustomToast from "../../hooks/useCustomToast";
import { toTitle } from "../../utilities/transform-text";
import { getColorFromJobStatus } from "../../utilities/styles";

interface JobProps {
  job: JobsAPIResponse;
  index: number;
  editState: [
    boolean,
    Dispatch<React.SetStateAction<boolean>>,
    Dispatch<React.SetStateAction<JobsAPIResponse | null>>
  ];
}

const Job = ({ job, index, editState }: JobProps) => {
  const showUpdate = job.createdAt !== job.updatedAt;
  const background = useColorModeValue("#fdfdfd", "gray.700");
  const { colorMode } = useColorMode();

  const [isMobileScreen] = useMediaQuery("(max-width: 30em)");

  const [isEditing, setIsEditing, setEditJob] = editState;

  const [displayElements, setDisplayElements] = useState(false);

  const toast = useToast();
  const displayDeleteToast = useCustomToast({
    title: `Job #${index} deleted!`,
  });

  const displayEditingToast = useCustomToast({
    title: `Editing Job #${index}!`,
    status: "info",
  });

  const appStore = useAppStore();

  const deleteJob = async (id: string) => {
    if (window.confirm(`Are you sure that you want to delete job #${index}`)) {
      appStore.deleteJob(id);
      try {
        await JobsAPI.delete(id);
        displayDeleteToast();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const hideElements = !isMobileScreen && !displayElements;
  return (
    <Flex
      onMouseOver={() => {
        !isMobileScreen && setDisplayElements(true);
      }}
      onMouseOut={() => {
        !isMobileScreen && setDisplayElements(false);
      }}
      border="#ceced3 medium solid"
      whiteSpace="nowrap"
      position="relative"
      borderRadius="xl"
      alignItems="center"
      justifyContent={["left", "center"]}
      bg={background}
      px="4em"
      py="3em"
    >
      <Flex overflow="auto" direction="column">
        <HStack>
          <Text fontSize="lg" fontWeight="semibold">
            {toTitle(job.company)}
          </Text>
        </HStack>
        <HStack>
          <Text fontSize="lg"> {toTitle(job.jobTitle)}</Text>
        </HStack>
        <HStack>
          <Text
            fontSize="lg"
            fontWeight="semibold"
            color={getColorFromJobStatus(job.status, 500)}
          >
            {toTitle(job.status)}
          </Text>
        </HStack>
        {job.userComment && (
          <>
            <Text fontWeight="bold"></Text>

            <Stack
              mt="0.1em"
              px="1em"
              py="0.5em"
              border="#ceced3 thin solid"
              borderRadius="lg"
            >
              <Text
                whiteSpace="pre-wrap"
                textAlign="left"
                fontSize="sm"
                fontWeight="normal"
              >
                {toTitle(job.userComment)}
              </Text>
            </Stack>
          </>
        )}
      </Flex>
      <Box
        hidden={hideElements}
        p={1}
        top={0}
        right={0}
        position="absolute"
        onClick={() => {
          toast.closeAll();
          deleteJob(job._id);
        }}
        borderTopRightRadius="lg"
        color="red.500"
        _hover={{
          cursor: "pointer",
          background: colorMode === "dark" ? "gray.200" : "red.50",
        }}
      >
        {!isEditing && <MdDelete />}
      </Box>

      {!isEditing && (
        <Box
          hidden={hideElements}
          p={1}
          top={0}
          left={0}
          borderTopLeftRadius="lg"
          position="absolute"
          onClick={() => {
            toast.closeAll();
            displayEditingToast();
            setIsEditing(true);
            setEditJob(job);
            appStore.setJobs(
              appStore.jobs.filter((item) => item._id === job._id)
            );
          }}
          color="blue.500"
          _hover={{
            cursor: "pointer",
            background: colorMode === "dark" ? "gray.200" : "blue.50",
          }}
        >
          <MdEdit />
        </Box>
      )}
      <Text
        fontWeight="semibold"
        fontSize="2xs"
        top={0.5}
        position={"absolute"}
      >
        {new Date(job.createdAt).toLocaleDateString("en-us", {
          month: "short",
          day: "2-digit",
          weekday: "short",
          year: "numeric",
        })}
      </Text>
      {showUpdate && (
        <Text
          hidden={hideElements}
          fontSize="2xs"
          fontWeight="semibold"
          bottom={0.5}
          left={[3, "inherit"]}
          position={"absolute"}
        >
          {"Updated at: "}
          {new Date(job.updatedAt).toLocaleDateString("en-us", {
            month: "short",
            day: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      )}
    </Flex>
  );
};

export default Job;
