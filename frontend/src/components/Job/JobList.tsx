import { Box, Flex } from "@chakra-ui/react";
import { Dispatch } from "react";
import { JobsAPIResponse } from "../../api/interfaces/jobs";
import Job from "./Job";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useAppStore from "../../store/store";

interface JobListProps {
  jobs: JobsAPIResponse[];
  editState: [
    boolean,
    Dispatch<React.SetStateAction<boolean>>,
    Dispatch<React.SetStateAction<JobsAPIResponse | null>>
  ];
}

const JobList = ({ jobs, editState }: JobListProps) => {
  const [parent] = useAutoAnimate<HTMLInputElement>();
  const jobsState = useAppStore((state) => state.jobs);

  return (
    <Flex ml={[0, 3]} ref={parent} wrap="wrap" p={5} gap={8}>
      {jobs.map((item, index) => (
        <Box
          borderRadius="xl"
          overflow="auto"
          margin={["auto", "auto", jobsState.length === 1 ? "center" : 0]}
          key={item._id}
        >
          <Job job={item} index={index + 1} editState={editState} />
        </Box>
      ))}
    </Flex>
  );
};

export default JobList;
