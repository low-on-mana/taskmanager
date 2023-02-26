package com.thimblerr.taskmanager.exceptions;

public class InvalidStatusTransition extends RuntimeException {

    public InvalidStatusTransition(String message) {
        super(message);
    }
}
