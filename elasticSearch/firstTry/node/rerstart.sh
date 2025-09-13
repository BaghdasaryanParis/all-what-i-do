#!/bin/bash

# Define the command to run your JavaScript script
JS_COMMAND="node ./script.js"

# Infinite loop to keep the script running
while true; do
    echo "Starting JavaScript script..."
    # Execute the JavaScript script
    # The 'wait' command is not strictly necessary here unless you need to wait for background processes
    # The exit status of the JS_COMMAND will determine if the loop continues
    $JS_COMMAND

    # Check the exit status of the last command
    if [ $? -ne 0 ]; then
        echo "JavaScript script exited with an error. Restarting in 5 seconds..."
        sleep 5 # Wait before restarting to prevent rapid restarts
    else
        echo "JavaScript script exited normally. Restarting immediately..."
    fi
done