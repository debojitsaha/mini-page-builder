# Mini Page Builder

## Introduction

Welcome to the Mini Page Builder project! This web application allows users to create and manage elements like labels, inputs, and buttons on a canvas. Built with React.js and Tailwind CSS, it features drag-and-drop functionality, element customization, and data persistence through local storage.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/debojitsaha/mini-page-builder.git
    cd mini-page-builder
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Start the development server:**
    ```sh
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

## Features & Usage

1. **Drag elements from the sidebar**: On the left side of the screen, you will find elements such as Label, Input, and Button. Drag any of these elements to the canvas on the right side.

2. **Edit element properties**: Upon dropping an element onto the canvas, an Edit Label Modal will appear where you can modify the text, font weight, and font size of the element. Save the changes.

3. **Update position**: To change the position of an element, simply drag it to the desired location on the canvas. The new position will be automatically saved.

4. **Delete elements**: Select an element by clicking on it and press the delete key to remove it from the canvas.

5. **Clear the canvas**: Click the "Clear" button to remove all elements from the canvas. This action cannot be undone.

6. **Export configuration**: Click the "Export JSON" button to download the current configuration of the canvas as a JSON file.

## Project Structure

- **`src/components/Draggable.tsx`**: Handles the initial dragging of elements.
- **`src/components/DroppableArea.tsx`**: Represents the canvas area where elements are dropped.
- **`src/components/Dropped.tsx`**: Manages dropped elements on the canvas.
- **`src/components/Modal.tsx`**: Edit Label Modal for element customization.
- **`src/hooks/useToast.ts`**: Custom hook for toast notifications.
- **`src/ui/button/Button.tsx`**: Button component.
- **`src/ui/toast/ToastContainer.tsx`**: Container for displaying toast notifications.
- **`src/pages/Home.tsx`**: Main page that integrates all components and handles global functions.

## Technologies Used

- **React.js**: For building the user interface.
- **Tailwind CSS**: For styling the application.
- **TypeScript**: For type-safe JavaScript code.
- **Local Storage**: For persisting the state of the application.
- **nanoid**: For generating unique IDs for components.

---

Thank you for using the Mini Page Builder!