import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Textarea,
  useColorMode,
  useColorModeValue,
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
import { JobsAPIResponse } from "../api/interfaces/jobs";
import { getColorFromJobStatus } from "../utilities/styles";

import { FaMoon, FaSun } from "react-icons/fa";
import { localStorageKeys } from "../api/config";

const Home = () => {
  const toast = useToast();
  const appStore = useAppStore();

  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [userComment, setUserComment] = useState("");

  const [status, setStatus] = useState<JobStatus>(JobStatus.PENDING);

  const [jobEdit, setJobEdit] = useState<JobsAPIResponse | null>(null);

  const [inEditMode, setInEditMode] = useState(false);
  const [editDone, isEditDone] = useState(false);
  const [loading, setIsLoading] = useState(true);

  const background = useColorModeValue("white", "gray.700");
  const placeHolderColor = useColorModeValue("gray.700", "gray.100");
  const titleColor = useColorModeValue("blue.600", "blue.200");
  const logoutColor = useColorModeValue("gray.400", "gray.700");

  const IconColorMode = useColorModeValue(FaMoon, FaSun);

  const { colorMode, toggleColorMode } = useColorMode();

  const darkMode = colorMode === "dark";

  const statusList = [
    JobStatus.PENDING,
    JobStatus.DECLINED,
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
    setIsLoading(true);
    getJobs();
    setIsLoading(false);
  }, []);

  const resetInputs = () => {
    setCompany("");
    setJobTitle("");
    setUserComment("");
    setStatus(JobStatus.PENDING);
  };

  const getJobs = async () => {
    try {
      const response = await JobsAPI.findAll(appStore.user.token);

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
    if (jobEdit) {
      setCompany(jobEdit.company);
      setJobTitle(jobEdit.jobTitle);

      setStatus(JobStatus.PENDING);
      setUserComment(jobEdit.userComment ?? "");
    } else {
      resetInputs();
    }
  }, [jobEdit]);

  useEffect(() => {
    if (appStore.jobs.length >= 0) {
      setIsLoading(false);
    }
  }, [appStore.jobs.length]);

  const createJob = async () => {
    try {
      const response = await JobsAPI.create(
        {
          company,
          jobTitle,
          userComment,
        },
        appStore.user.token
      );
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
    if (jobEdit === null) return;

    let has_error = false;
    try {
      const { data: currentJob } = await JobsAPI.findOne(
        jobEdit._id,
        appStore.user.token
      );
      setJobEdit(null);

      await JobsAPI.update(
        jobEdit._id,
        {
          company: company || currentJob.company,
          jobTitle: jobTitle || currentJob.jobTitle,
          status: status || currentJob.status,
          userComment:
            userComment === currentJob.userComment
              ? currentJob.userComment
              : userComment,
        },
        appStore.user.token
      );

      displayEditedToast();
      resetInputs();

      const { data: allJobs } = await JobsAPI.findAll(appStore.user.token);

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

  const deleteJobs = async () => {
    if (window.confirm("Are you sure that you want to delete all the jobs ?")) {
      appStore.deleteAllJobs();
      await JobsAPI.deleteAll(appStore.user.token);
    }
  };

  return (
    <Box>
      <HStack
        px={[5, 10]}
        alignItems="center"
        justifyContent={["unset", "center"]}
      >
        <Heading
          color={titleColor}
          as="h1"
          textAlign="center"
          fontSize={["2rem", "2rem", "3rem"]}
          mr={["auto", 0]}
        >
          Job Hunt Tracker
        </Heading>
        <Flex alignItems="center" justifyContent="center">
          <Button
            bg={logoutColor}
            px="1.3em"
            size="sm"
            onClick={toggleColorMode}
            position={["unset", "absolute"]}
            top={2}
            right={"6.4rem"}
            mr={[1, 0]}
          >
            {<IconColorMode />}
          </Button>
          <Button
            px="1.3em"
            size="sm"
            top={2}
            right={[2]}
            position={["unset", "absolute"]}
            onClick={() => {
              localStorage.removeItem(localStorageKeys.jwtToken);
              appStore.setToken("");
              window.location.href = "login";
            }}
            bg={logoutColor}
          >
            Log out
          </Button>
        </Flex>
      </HStack>

      <HStack p={[5, 10]} alignContent="center" justifyContent="center">
        <Box display={["block", "flex"]}>
          <Input
            focusBorderColor={placeHolderColor}
            value={company}
            borderRadius="md"
            bg={background}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="Company"
            size="sm"
            _placeholder={{
              color: placeHolderColor,
            }}
          />
          <Input
            focusBorderColor={placeHolderColor}
            value={jobTitle}
            mt={[2, 0]}
            ml={[0, 2]}
            borderRadius="md"
            bg={background}
            onChange={(event) => setJobTitle(event.target.value)}
            placeholder="Job Title"
            size="sm"
            _placeholder={{
              color: placeHolderColor,
            }}
          />
          <Textarea
            focusBorderColor={placeHolderColor}
            value={userComment}
            mt={[2, 0]}
            ml={[0, 2]}
            borderRadius="md"
            bg={background}
            onChange={(event) => setUserComment(event.target.value)}
            placeholder="Comment"
            _placeholder={{
              color: placeHolderColor,
            }}
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
                  _active={{
                    background: getColorFromJobStatus(
                      status,
                      darkMode ? 600 : 400
                    ),
                  }}
                  w={["full", "initial"]}
                  bg={getColorFromJobStatus(status, darkMode ? 500 : 400)}
                  _hover={{
                    background: getColorFromJobStatus(
                      status,
                      darkMode ? 600 : 200
                    ),
                  }}
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
                bg={darkMode ? "blue.500" : "blue.300"}
                _hover={{
                  background: darkMode ? "blue.600" : "blue.200",
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
                  bg={darkMode ? "red.500" : "red.300"}
                  _hover={{
                    background: darkMode ? "red.600" : "red.200",
                  }}
                  variant="solid"
                  type="submit"
                  onClick={() => {
                    toast.closeAll();
                    setInEditMode(false);
                    isEditDone(true);
                    resetInputs();
                  }}
                  size="sm"
                >
                  Cancel
                </Button>
              </Box>
            </HStack>
          </>
        ) : (
          <>
            <Button
              alignSelf={"center"}
              bg={darkMode ? "blue.500" : "blue.300"}
              _hover={{
                background: darkMode ? "blue.600" : "blue.200",
              }}
              variant="solid"
              type="submit"
              onClick={() => {
                toast.closeAll();
                createJob();
              }}
              size="sm"
              px={["2em", "1em"]}
            >
              Create
            </Button>
            <Button
              hidden={appStore.jobs.length <= 1}
              alignSelf={"center"}
              bg={darkMode ? "red.500" : "red.300"}
              _hover={{
                background: darkMode ? "red.600" : "red.200",
              }}
              variant="solid"
              type="submit"
              onClick={() => {
                toast.closeAll();
                deleteJobs();
              }}
              size="sm"
              px={["2em", "1em"]}
            >
              Delete All
            </Button>
          </>
        )}
      </HStack>
      <Box>
        <JobList
          editState={[inEditMode, setInEditMode, setJobEdit]}
          jobs={appStore.jobs}
        />
      </Box>
    </Box>
  );
};

export default Home;
