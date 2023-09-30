import React from "react";
import { Box, Center, Heading, Icon } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

function Instructions() {
  return (
    <Center>
      {" "}
      <Box p="4">
        <Heading mb="4" color="blue.400">
          Instructions
        </Heading>

        <ol>
          <li>
            Click on the <Icon as={ChevronRightIcon} color="blue.400" /> button
            to move to the next question.
          </li>
          <li>
            You cannot go back to previous questions once you've clicked "Next."
          </li>
          <li>After answering all the questions, click the "Submit" button.</li>
          <li>
            You will see your score and receive remarks based on your answers.
          </li>
          <li>
            Click on the profile icon above in the navbar to view your previous
            quiz scores and the total average.
          </li>
          <li>You cannot go to the next question without choosing an option</li>
        </ol>
      </Box>
    </Center>
  );
}

export default Instructions;
