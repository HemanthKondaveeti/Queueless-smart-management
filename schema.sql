-- Database Schema for Queueless Smart Management
-- Generated based on JPA Entities

-- Table: User
CREATE TABLE IF NOT EXISTS `user` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `full_name` VARCHAR(255),
    `email` VARCHAR(255),
    `password` VARCHAR(255),
    `role` VARCHAR(50) -- Enum: ADMIN, USER, etc.
);

-- Table: ServiceCenter
CREATE TABLE IF NOT EXISTS `service_center` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255)
);

-- Table: Department
CREATE TABLE IF NOT EXISTS `department` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255),
    `max_slots` INT,
    `avg_service_time` INT,
    `service_center_id` BIGINT,
    CONSTRAINT `fk_department_service_center` FOREIGN KEY (`service_center_id`) REFERENCES `service_center` (`id`)
);

-- Table: TimeSlot
CREATE TABLE IF NOT EXISTS `time_slot` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `slot` VARCHAR(255),
    `department_id` BIGINT,
    CONSTRAINT `fk_time_slot_department` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
);

-- Table: QueueToken
CREATE TABLE IF NOT EXISTS `queue_token` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `token_number` VARCHAR(255),
    `booking_time` DATETIME(6),
    `estimated_serve_time` DATETIME(6),
    `status` VARCHAR(50), -- Enum: BOOKED, COMPLETED, CANCELLED, etc.
    `user_id` BIGINT,
    `department_id` BIGINT,
    `service_center_id` BIGINT,
    CONSTRAINT `fk_queue_token_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `fk_queue_token_department` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`),
    CONSTRAINT `fk_queue_token_service_center` FOREIGN KEY (`service_center_id`) REFERENCES `service_center` (`id`)
);

-- Table: Feedback
CREATE TABLE IF NOT EXISTS `feedback` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255),
    `email` VARCHAR(255),
    `message` TEXT
);
