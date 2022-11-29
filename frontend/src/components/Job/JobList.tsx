import { Grid, GridItem } from "@chakra-ui/react";
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
    <Grid
      p={5}
      as={"ul"}
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(4, 1fr)",
        "repeat(5, 1fr)",
      ]}
      justifyContent="space-around"
      placeItems={["center", "unset"]}
      gap={8}
    >
      {jobs.map((item, index) => (
        <GridItem key={item._id}>
          <Job job={item} index={index + 1} editState={editState} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default JobList;
