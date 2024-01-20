# Decide
An interactive web tool that visualizes a weighted knowledge graph containing 2,376 version knowledge extracted from Stack Overflow discussions.

## Summary
Version incompatibility issues are prevalent when reusing or reproducing deep learning (DL) models and applications. While official documents such as PyPI are neither comprehensive nor up-to-date, Stack Overflow (SO) discussions possess a wealth of version knowledge that has not been explored by previous approaches. To bridge this gap, we present WebDecide, a web-based visualization of a weighted knowledge graph that contains 2,376 version knowledge extracted from SO discussions. As an interactive tool, WebDecide allows the users to easily check whether two libraries are compatible or not, search for a third-party DL component with a specific version, explore a DL component without any version constraint, and shows relevant SO posts as references.

![Overview](https://github.com/LexieZhou/Decide/assets/78584281/5b86d924-48b5-4da7-bfb3-14541e159ea3)

## System Requirements
- Node.js: Ensure that you have Node.js installed on your system. You can download the latest version from the official Node.js website (https://nodejs.org) and follow the installation instructions for your operating system.

## Steps to Run the Tool
- git clone https://github.com/LexieZhou/Decide.git
- install dependencies
  - cd client
  - npm install
  - cd ../server
  - npm install
- Start the Project
  - cd server
  - node server.js
  - cd ../client
  - npm start

Remark: If encounter any dependency error, try `npm install --force` instead

## Video
https://youtu.be/d7YUe2ahYWQ
