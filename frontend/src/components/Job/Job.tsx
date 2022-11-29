import { Dispatch } from "react";
import { JobsAPIResponse } from "../../api/interfaces/jobs";
import { JobsAPI } from "../../api/jobs";
import useAppStore from "../../store/store";
import { MdDelete, MdEdit } from "react-icons/md";
import { Flex, Text, Box, HStack } from "@chakra-ui/react";
import useCustomToast from "../../hooks/useCustomToast";
import { JobStatus } from "./interfaces/jobs";
import { toTitle } from "../../utilities/transform-text";
import { AiOutlineNumber } from "react-icons/ai";

interface JobProps {
  job: JobsAPIResponse;
  index: number;
  editState: [
    boolean,
    Dispatch<React.SetStateAction<boolean>>,
    Dispatch<React.SetStateAction<string>>
  ];
}

const Job = ({ job, index, editState }: JobProps) => {
  const [isEditing, setIsEditing, setJobId] = editState;

  const displayDeleteToast = useCustomToast({
    title: `Job #${index} deleted!`,
  });

  const displayEditingToast = useCustomToast({
    title: `Editing Job #${index}!`,
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

  return (
    <Flex
      whiteSpace="nowrap"
      shadow="md"
      position="relative"
      borderRadius="xl"
      alignItems="center"
      justifyContent={["left", "center"]}
      bg="white"
      px={["4.5em", "1.5em"]}
      py={["2em", "2em"]}
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
            style={{
              color:
                job.status === JobStatus.DECLINED
                  ? "red"
                  : job.status === JobStatus.INTERVIEW
                  ? "green"
                  : "#f06c1a",
            }}
          >
            {toTitle(job.status)}
          </Text>
        </HStack>
      </Flex>
      <Box
        p={1}
        top={0}
        right={0}
        position="absolute"
        onClick={() => deleteJob(job._id)}
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
          p={1}
          top={0}
          right={6}
          position="absolute"
          onClick={() => {
            displayEditingToast();
            setIsEditing(true);
            setJobId(job._id);
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
