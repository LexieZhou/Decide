# Decide
An interactive web tool that visualizes a weighted knowledge graph containing 2,376 version knowledge extracted from Stack Overflow discussions.

## Summary
Version incompatibility issues are prevalent when reusing or reproducing deep learning (DL) models and applications. While official documents such as PyPI are neither comprehensive nor up-to-date, Stack Overflow (SO) discussions possess a wealth of version knowledge that has not been explored by previous approaches. To bridge this gap, we present WebDecide, a web-based visualization of a weighted knowledge graph that contains 2,376 version knowledge extracted from SO discussions. As an interactive tool, WebDecide allows the users to easily check whether two libraries are compatible or not, search for a third-party DL component with a specific version, explore a DL component without any version constraint, and shows relevant SO posts as references.

![Overview](https://github.com/LexieZhou/Decide/assets/78584281/5b86d924-48b5-4da7-bfb3-14541e159ea3)

## System Requirements
- Node.js: Ensure that you have Node.js installed on your system. You can download the latest version from the official Node.js website (https://nodejs.org) and follow the installation instructions for your operating system.

## Steps to Run the Tool
- Clone or download this github repository:
  - `git clone https://github.com/LexieZhou/Decide.git`
- Install dependencies
  - Navigate into the backend directory: `cd server`
  - Install the requirements: `npm install`
  - Navigate into the frontend directory: `cd ../client`
  - Install the requirements: `npm install`
- Start the Project
  - Navigate into the backend directory: `cd server`
  - Start the server: `node server.js`
  - Navigate into the frontend directory: `cd ../client`
  - Start the project in browser: `npm start`

Remark: If encounter any dependency error, try `npm install --force` instead.

## Usage
### A. Compatibility Visualizer
  Users can zoom in, zoom out, and drag to explore the details. Each node inside this knowledge graph is a versioned deep learning stack component. When hovering over the node, users can see the detailed information about this node in the right corner. The links between nodes represent their (in)compatibility relationships. Solid links indicate compatibility, while dashed links indicate an incompatibility relationship between two components.

### B. Information Panel
- Click certain component
  - The information panel will present detailed information about the library sourced from Libraries.io.
- Click certain link
  - The information panel will show details about two components, their detected (in)compatibility relationship, an evidence score, and supporting posts. Additionally, you can explore posts supporting both the compatible and incompatible relationships. Clicking on the vote link takes you directly to the original posts on the Stack Overflow platform.
  
### C. Search Bar
Decide supports three kinds of searches. 
- Quickly check the compatibility between two deep learning components by entering a simple query.
  - e.g. Does Python 3.6.8 work with Ubuntu 16.04.6?
- Search for compatibility knowledge about versioned deep learning components.
  - e.g. Ubuntu 14.04
- Explore compatibility knowledge for deep learning stack components with no version specified.
  - e.g. Tensorflow

### D. Statistical Panel
Decide shows statistical information about the top entities in each deep learning layer in the left panel. Hovering over a bar allows you to filter the knowledge graph to display the corresponding deep learning stack component and its compatibility relationships in the Compatibility Visualizer.

## Video
https://youtu.be/d7YUe2ahYWQ
