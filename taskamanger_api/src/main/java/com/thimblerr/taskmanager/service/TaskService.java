package com.thimblerr.taskmanager.service;

import com.thimblerr.taskmanager.contract.CreateTaskRequest;
import com.thimblerr.taskmanager.contract.UpdateTaskRequest;
import com.thimblerr.taskmanager.model.Task;
import com.thimblerr.taskmanager.model.TaskAudit;
import com.thimblerr.taskmanager.model.TaskAuditStrategy;
import com.thimblerr.taskmanager.repository.TaskAuditRepository;
import com.thimblerr.taskmanager.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    private final TaskAuditRepository taskAuditRepository;

    @Transactional
    public void createTask(CreateTaskRequest taskRequest) {
        Task task = Task.builder()
                .content(taskRequest.getContent())
                .title(taskRequest.getTitle())
                .eta(taskRequest.getEta())
                .build();
        taskRepository.save(task);
        taskAuditRepository.save(TaskAudit.buildFromTask(task));
    }

    @Transactional
    public void updateTask(Integer taskId, UpdateTaskRequest taskRequest) {
        Task task = taskRepository.findById(taskId).orElseThrow();
        task.setEta(taskRequest.getEta());
        task.setStatus(taskRequest.getStatus());
        task.setContent(taskRequest.getContent());
        taskRepository.save(task);
        taskAuditRepository.save(TaskAudit.buildFromTask(task));
    }

    public List<Task> getTasks() {
        return taskRepository.findAll();
    }

    @Transactional
    public void delete(Integer taskId) {
        taskAuditRepository.deleteByTaskId(taskId);
        taskRepository.deleteById(taskId);
    }

    public List<TaskAudit> getAuditTrail(Integer taskId, TaskAuditStrategy taskAuditStrategy) {
        List<TaskAudit> taskAudits = taskAuditRepository.findByTaskIdOrderByCreatedAtDesc(taskId);
        if(taskAudits.isEmpty()) {
            return taskAudits;
        }
        return taskAuditStrategy.createTrail(taskAudits);
    }
}
