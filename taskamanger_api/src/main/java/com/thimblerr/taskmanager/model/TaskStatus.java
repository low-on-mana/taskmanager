package com.thimblerr.taskmanager.model;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum TaskStatus {
    PENDING(0), IN_PROGRESS(1), IN_REVIEW(2), COMPLETE(3);

    private final int order;

    public boolean canTransitionTo(TaskStatus status) {
        return this.order <= status.order;
    }
}
