package com.thimblerr.taskmanager.repository;

import com.thimblerr.taskmanager.model.TaskAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskAuditRepository extends JpaRepository<TaskAudit, Integer> {

    List<TaskAudit> findByTaskIdOrderByCreatedAtDesc(Integer taskId);

    void deleteByTaskId(Integer taskId);
}
