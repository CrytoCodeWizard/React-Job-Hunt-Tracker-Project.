import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { Dispatch } from "react";
import { JobsAPIResponse } from "../../api/interfaces/jobs";
import Job from "./Job";

interface JobListProps {
  jobs: JobsAPIResponse[];
  editState: [
    boolean,
    Dispatch<React.SetStateAction<boolean>>,
    Dispatch<React.SetStateAction<string>>
  ];
}

const JobList = ({ jobs, editState }: JobListProps) => {
  return (
    <Flex wrap={"wrap"} p={5} as={"ul"} gap={8}>
      {jobs.map((item, index) => (
        <Box margin={"auto"} key={item._id}>
          <Job job={item} index={index + 1} editState={editState} />
        </Box>
      ))}
    </Flex>
  );
};

export default JobList;
