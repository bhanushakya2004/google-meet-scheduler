# Google Meet Scheduler

## Description

Google Meet Scheduler is a tool designed to help you schedule Google Meet meetings effortlessly. This project is primarily written in JavaScript and includes Docker support.

## Features

- Schedule Google Meet meetings with ease
- Integration with Google Calendar
- User-friendly interface
- Docker support for easy deployment

## Installation

### Prerequisites

- Node.js
- Docker (optional)

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/bhanushakya2004/google-meet-scheduler.git
    cd google-meet-scheduler
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the necessary environment variables (e.g., Google API keys).

4. Run the application:
    ```bash
    npm start
    ```

### Docker

To run the application using Docker, follow these steps:

1. Build the Docker image:
    ```bash
    docker build -t google-meet-scheduler .
    ```

2. Run the Docker container:
    ```bash
    docker run -d -p 3000:3000 google-meet-scheduler
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Follow the on-screen instructions to schedule a Google Meet meeting.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact [bhanushakya2004](https://github.com/bhanushakya2004).
