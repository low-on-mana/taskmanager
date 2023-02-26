package com.thimblerr.taskmanager.controller;

import com.thimblerr.taskmanager.contract.CreateTaskRequest;
import com.thimblerr.taskmanager.contract.UpdateTaskRequest;
import com.thimblerr.taskmanager.model.Task;
import com.thimblerr.taskmanager.model.TaskAudit;
import com.thimblerr.taskmanager.model.TaskAuditStrategy;
import com.thimblerr.taskmanager.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    @GetMapping("/")
    private List<Task> getAll() {
        return taskService.getTasks();
    }

    @PostMapping("/")
    private void create(@RequestBody @Valid CreateTaskRequest createTaskRequest) {
        taskService.createTask(createTaskRequest);
    }

    @PutMapping("/{id}")
    private void update(@PathVariable Integer id, @RequestBody @Valid UpdateTaskRequest updateTaskRequest) {
        taskService.updateTask(id, updateTaskRequest);
    }

    @GetMapping("/{id}/audit")
    private List<TaskAudit> getAuditTrail(@PathVariable Integer id, @RequestParam TaskAuditStrategy taskAuditStrategy) {
        return taskService.getAuditTrail(id, taskAuditStrategy);
    }

    @DeleteMapping("/{id}")
    private void delete(@PathVariable Integer id) {
        taskService.delete(id);
    }
}
