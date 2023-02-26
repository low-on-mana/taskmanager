package com.thimblerr.taskmanager.model;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.function.BiPredicate;

@RequiredArgsConstructor
public enum TaskAuditStrategy {
    STATUS {
        /**
         * @param taskAudits All task audits for a given task ordered by created_at
         * @return returns the filtered list of task audits where status change is captured
         */
        @Override
        public List<TaskAudit> createTrail(List<TaskAudit> taskAudits) {
            return createTrail(taskAudits, ((taskAudit1, taskAudit2) -> !taskAudit1.getStatus().equals(taskAudit2.getStatus())));
        }
    },
    ETA {
        /**
         * @param taskAudits All task audits for a given task ordered by created_at
         * @return returns the filtered list of task audits where eta status change is captured
         */
        @Override
        public List<TaskAudit> createTrail(List<TaskAudit> taskAudits) {
            return createTrail(taskAudits, ((taskAudit1, taskAudit2) -> !taskAudit1.getEta().equals(taskAudit2.getEta())));
        }
    };

    List<TaskAudit> createTrail(List<TaskAudit> taskAudits, BiPredicate<TaskAudit, TaskAudit> predicate) {
        List<TaskAudit> filteredAudits = new ArrayList<>();
        for(int i = 0; i < taskAudits.size() - 1; i++) {
            TaskAudit taskAudit1 = taskAudits.get(i);
            TaskAudit taskAudit2 = taskAudits.get(i+1);
            if(predicate.test(taskAudit1, taskAudit2)) {
                filteredAudits.add(taskAudit1);
            }
        }
        filteredAudits.add(taskAudits.get(taskAudits.size() - 1));
        return filteredAudits;
    }

    public abstract List<TaskAudit> createTrail(List<TaskAudit> taskAudits);
}
// 1, PENDING, 3 march
// 1, REVIEW, 3 march
