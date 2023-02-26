package com.thimblerr.taskmanager.model;

import com.thimblerr.taskmanager.exceptions.InvalidStatusTransition;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TaskTest {

    @Test
    @DisplayName("setStatus runs correctly when status transition is allowed")
    void setStatus() {
        Task task = Task.builder()
                .status(TaskStatus.PENDING)
                .build();

        task.setStatus(TaskStatus.IN_PROGRESS);
        assertEquals(task.getStatus(), TaskStatus.IN_PROGRESS);

        task.setStatus(TaskStatus.COMPLETE);
        assertEquals(task.getStatus(), TaskStatus.COMPLETE);
    }

    @Test
    @DisplayName("setStatus throws error in case of invalid state transition")
    void setStatus2() {
        Task task = Task.builder()
                .status(TaskStatus.PENDING)
                .build();

        task.setStatus(TaskStatus.IN_PROGRESS);
        assertEquals(task.getStatus(), TaskStatus.IN_PROGRESS);

        assertThrows(InvalidStatusTransition.class, () -> {task.setStatus(TaskStatus.PENDING);});
    }
}