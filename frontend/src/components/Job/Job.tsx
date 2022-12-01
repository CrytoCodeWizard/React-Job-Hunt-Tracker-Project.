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
} from "@chakra-ui/react";
import useCustomToast from "../../hooks/useCustomToast";
import { toTitle } from "../../utilities/transform-text";
import { AiOutlineNumber } from "react-icons/ai";
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
  const [isMobileScreen] = useMediaQuery("(max-width: 30em)");

  const [isEditing, setIsEditing, setEditJob] = editState;

  const [displayEditDeleteButtons, setDisplayEditDeleteButtons] =
    useState(false);
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
  const hideEditDeleteButtons = !isMobileScreen && !displayEditDeleteButtons;
  return (
    <Flex
      onMouseOver={() => {
        !isMobileScreen && setDisplayEditDeleteButtons(true);
      }}
      onMouseOut={() => {
        !isMobileScreen && setDisplayEditDeleteButtons(false);
      }}
      border="#ceced3 medium solid"
      whiteSpace="nowrap"
      position="relative"
      borderRadius="xl"
      alignItems="center"
      justifyContent={["left", "center"]}
      bg="white"
      p="1.5em"
    >
      <Flex overflow="auto" direction="column">
        <HStack>
          <Text fontWeight="bold">Company:</Text>
          <Text> {toTitle(job.company)}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">{"Job Title:"}</Text>
          <Text> {toTitle(job.jobTitle)}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">Status:</Text>
          <Text
            fontWeight="semibold"
            color={getColorFromJobStatus(job.status, 500)}
          >
            {toTitle(job.status)}
          </Text>
        </HStack>
        {job.userComment && (
          <>
            <Text fontWeight="bold">Comment:</Text>

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
        hidden={hideEditDeleteButtons}
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
          background: "red.50",
        }}
      >
        {!isEditing && <MdDelete />}
      </Box>

      {!isEditing && (
        <Box px={2} top={0} left={0} position="absolute" color="black.500">
          <Flex alignItems="center">
            <AiOutlineNumber />
            <Text fontSize="0.9rem" fontWeight="medium">{`${index}`}</Text>
          </Flex>
        </Box>
      )}
      {!isEditing && (
        <Box
          hidden={hideEditDeleteButtons}
          p={1}
          top={0}
          right={6}
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
            background: "blue.50",
          }}
        >
          <MdEdit />
        </Box>
      )}
    </Flex>
  );
};

export default Job;
