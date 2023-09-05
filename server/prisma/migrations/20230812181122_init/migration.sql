-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(24) NOT NULL,
    `username` VARCHAR(20) NOT NULL,
    `password` VARCHAR(24) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(24) NOT NULL,
    `user_id` VARCHAR(24) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Form` (
    `id` VARCHAR(24) NOT NULL,
    `user_id` VARCHAR(24) NOT NULL,
    `title` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FormElement` (
    `id` VARCHAR(24) NOT NULL,
    `form_id` VARCHAR(24) NOT NULL,
    `type` VARCHAR(16) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Answer` (
    `id` VARCHAR(24) NOT NULL,
    `form_element_id` VARCHAR(24) NOT NULL,
    `user_id` VARCHAR(24) NOT NULL,
    `text` VARCHAR(2000) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Form` ADD CONSTRAINT `Form_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FormElement` ADD CONSTRAINT `FormElement_form_id_fkey` FOREIGN KEY (`form_id`) REFERENCES `Form`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_form_element_id_fkey` FOREIGN KEY (`form_element_id`) REFERENCES `FormElement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
