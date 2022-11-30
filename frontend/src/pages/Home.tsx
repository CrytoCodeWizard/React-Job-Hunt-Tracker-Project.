import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { JobsAPI } from "../api/jobs";
import JobList from "../components/Job/JobList";
import useAppStore from "../store/store";

import { FaArrowDown } from "react-icons/fa";
import { JobStatus } from "../components/Job/interfaces/jobs";
import useCustomToast from "../hooks/useCustomToast";
import { toTitle, transformErrorMessage } from "../utilities/transform-text";
import FullScreenSpinner from "../components/FullScreenSpinner";

const Home = () => {
  const toast = useToast();
  const appStore = useAppStore();

  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");

  const [status, setStatus] = useState<JobStatus>(JobStatus.PENDING);

  const [jobId, setJobId] = useState("");

  const [inEditMode, setInEditMode] = useState(false);
  const [editDone, isEditDone] = useState(false);
  const [loading, setIsLoading] = useState(true);

  const statusList = [
    JobStatus.DECLINED,
    JobStatus.PENDING,
    JobStatus.INTERVIEW,
  ];

  const displayCreatedToast = useCustomToast({
    title: "Job created!",
    duration: 3000,
  });

  const displayEditedToast = useCustomToast({
    title: "Job edited!",
    duration: 3000,
  });

  useEffect(() => {
    const name =
      appStore.user.name &&
      [appStore.user.name[0].toUpperCase(), appStore.user.name.slice(1)].join(
        ""
      );

    const { authMethod } = appStore;

    if (name && !toast.isActive(name)) {
      toast({
        id: name,
        position: "top",
        title: authMethod === "login" ? `Logged in` : `Account Created`,
        description:
          authMethod === "login"
            ? `Welcome back ${name}`
            : `Welcome to your Job Hunt Tracker, ${name}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }

    getJobs();
  }, []);

  const resetInputs = () => {
    setCompany("");
    setJobTitle("");
  };

  const getJobs = async () => {
    try {
      const response = await JobsAPI.findAll();

      appStore.setJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (editDone) {
      getJobs();
    }

    isEditDone(false);
  }, [editDone]);

  useEffect(() => {
    if (appStore.jobs.length >= 0) {
      setIsLoading(false);
    }
  }, [appStore.jobs.length]);

  const createJob = async () => {
    try {
      const response = await JobsAPI.create({ company, jobTitle });
      appStore.setJobs(response.data);
      resetInputs();

      displayCreatedToast();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          transformErrorMessage(error?.response?.data?.message) ?? "";

        if (!toast.isActive(errorMessage)) {
          toast({
            id: errorMessage,
            position: "top",
            title: "Error",
            description: errorMessage,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    }
  };

  const editJob = async () => {
    let has_error = false;
    try {
      const { data: currentJob } = await JobsAPI.findOne(jobId);
      resetInputs();

      await JobsAPI.update(jobId, {
        company: company || currentJob.company,
        jobTitle: jobTitle || currentJob.jobTitle,
        status: status || currentJob.status,
      });

      displayEditedToast();

      const { data: allJobs } = await JobsAPI.findAll();

      appStore.setJobs(allJobs);
    } catch (error) {
      has_error = true;
      if (axios.isAxiosError(error)) {
        const errorMessage =
          transformErrorMessage(error?.response?.data?.message) ?? "";

        if (!toast.isActive(errorMessage)) {
          toast({
            id: errorMessage,
            position: "bottom",
            title: "Error",
            description: errorMessage,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    }
    if (!has_error) {
      isEditDone(true);
      setInEditMode(false);
    }
  };

  if (loading) {
    return <FullScreenSpinner />;
  }

  return (
    <Box>
      <HStack px={10} alignItems="center" justifyContent={["unset", "center"]}>
        <Heading
          color="blue.600"
          as="h1"
          textAlign="center"
          fontSize={["2rem", "2rem", "3rem"]}
          mr={["auto", 0]}
        >
          Job Hunt Tracker
        </Heading>

        <Button
          px="1.3em"
          size="sm"
          top={2}
          right={[2]}
          position={["unset", "absolute"]}
          onClick={() => {
            localStorage.clear();
            appStore.setToken("");
            window.location.reload();
          }}
          bg="gray.300"
        >
          Log out
        </Button>
      </HStack>

      <HStack p={10} alignContent="center" justifyContent="center">
        <Box display={["block", "flex"]}>
          <Input
            value={company}
            borderRadius="md"
            bg="white"
            onChange={(event) => setCompany(event.target.value)}
            placeholder="Company"
            size="sm"
          />
          <Input
            value={jobTitle}
            mt={[2, 0]}
            ml={[0, 2]}
            borderRadius="md"
            bg="white"
            onChange={(event) => setJobTitle(event.target.value)}
            placeholder="Job Title"
            size="sm"
          />
        </Box>
        {inEditMode ? (
          <>
            <HStack
              flexDirection={["column", "row"]}
              alignContent="center"
              justifyContent="flex-end"
            >
              <Menu>
                <MenuButton
                  ml={[2, 0]}
                  mb={[1, 0]}
                  w={["full", "initial"]}
                  bg={"orange.300"}
                  px={4}
                  size={["sm"]}
                  as={Button}
                  rightIcon={<FaArrowDown />}
                >
                  {toTitle(status)}
                </MenuButton>
                <MenuList>
                  {statusList.map((item) => (
                    <MenuItem onClick={() => setStatus(item)} key={item}>
                      {toTitle(item)}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              <Button
                w={["full", "initial"]}
                px={4}
                bg="blue.300"
                _hover={{
                  background: "blue.200",
                }}
                variant="solid"
                type="submit"
                onClick={() => {
                  toast.closeAll();
                  editJob();
                }}
                size="sm"
              >
                Edit
              </Button>
              <Box w={["full", "unset"]}>
                <Button
                  w={["full", "initial"]}
                  px={4}
                  mt={[1, 0]}
                  bg="red.300"
                  _hover={{
                    background: "red.200",
                  }}
                  variant="solid"
                  type="submit"
                  onClick={() => {
                    toast.closeAll();
                    setInEditMode(false);
                    isEditDone(true);
                  }}
                  size="sm"
                >
                  Cancel
                </Button>
              </Box>
            </HStack>
          </>
        ) : (
          <Button
            bg="blue.300"
            _hover={{
              background: "blue.200",
            }}
            variant="solid"
            type="submit"
            onClick={createJob}
            size="sm"
          >
            Create
          </Button>
        )}
      </HStack>
      <Box>
        <JobList
          editState={[inEditMode, setInEditMode, setJobId]}
          jobs={appStore.jobs}
        />
      </Box>
    </Box>
  );
};

export default Home;
