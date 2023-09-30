import React, { useState } from "react";
import {
  Box,
  Heading,
  Radio,
  RadioGroup,
  Button,
  Text,
  Badge,
  Icon,
  Center,
} from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Instructions from "./Instructions";
import { INC } from "../Redux/user/ActionTypes";
function Quiz() {
  const [quizData, setQuizData] = useState([]);
  const dispatch = useDispatch();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const userId = useSelector((store) => {
    return store.auth.user.id;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedOption === "") {
      setResult("Please select an option.");
      return;
    }

    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setScore(score + 10);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    if (currentQuestionIndex + 1 == quizData.length) {
      axios
        .patch(`https://emitrrbackend.onrender.com/score/${userId}`, {
          score,
        })
        .then((response) => {
          console.log(response);
          dispatch({ type: INC, payload: score });
        })
        .catch((error) => {
          console.error("Error adding score:", error);
        });
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://emitrrbackend.onrender.com/questions"
      );

      setQuizData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    setScore(0);
  }, []);
  return (
    <Box p={4}>
      <Heading textAlign={"center"} as="h1" size="xl">
        Quiz
      </Heading>
      {currentQuestionIndex < quizData.length ? (
        <div>
          <form onSubmit={handleSubmit}>
            <Box textAlign={"center"} my={4} fontSize="xl">
              {quizData[currentQuestionIndex].question}
            </Box>
            <RadioGroup
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"5px"}
              onChange={setSelectedOption}
              value={selectedOption}
            >
              {quizData[currentQuestionIndex].options.map((option, index) => (
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  width={"350px"}
                  height={"40px"}
                  boxShadow={
                    " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
                  }
                  borderRadius={"4px"}
                >
                  <Radio paddingLeft={"20px"} key={index} value={option}>
                    {option}
                  </Radio>
                </Box>
              ))}
            </RadioGroup>

            <Center>
              <Button mt={4} colorScheme="blue" type="submit">
                {currentQuestionIndex + 1 !== quizData.length ? (
                  <>
                    Next
                    <Icon as={ChevronRightIcon} color="white" />
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </Center>
          </form>
          <Instructions />
        </div>
      ) : (
        <Box mt={4} fontSize="xl">
          <Button
            onClick={() => {
              setCurrentQuestionIndex(0);
              setScore(0);
              fetchData();
            }}
          >
            Reset Quiz
          </Button>
          <Heading color={score >= 70 ? "green" : "orange"} as="h1" size="xl">
            Score - {score} / 100
          </Heading>
          <Text>{score >= 80 ? "Doing Great" : "Need Improvement"}</Text>
          <Box p={4}>
            {quizData.map((question, index) => (
              <Box
                key={question._id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                my={4}
              >
                <Text fontSize="lg" fontWeight="bold">
                  {index + 1}. {question.question}
                </Text>
                <Text
                  fontSize={"24px"}
                  fontWeight={"bold"}
                  marginBottom={"40px"}
                >
                  Options:
                </Text>
                <ul
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,1fr)",
                    gap: "20px",
                  }}
                >
                  {question.options.map((option, optionIndex) => (
                    <li style={{ listStyleType: "none" }} key={optionIndex}>
                      {option}
                    </li>
                  ))}
                </ul>
                {question.correctAnswer && (
                  <Box mt={4}>
                    <Badge colorScheme="green">
                      Correct Answer {question.correctAnswer}
                    </Badge>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Quiz;
