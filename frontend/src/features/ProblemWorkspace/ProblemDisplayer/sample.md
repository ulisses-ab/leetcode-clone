# Build a Simple Task Management API

## Problem Statement
You are tasked with building a **task management API** that allows users to create, update, retrieve, and delete tasks. Each task has the following attributes:

- `id` (string): Unique identifier for the task.
- `title` (string): Title of the task.
- `description` (string): Detailed description of the task.
- `completed` (boolean): Status indicating whether the task is completed.
- `createdAt` (string): Timestamp when the task was created.

Your API should expose the following functionalities:

1. **Create a task**
   - Input: `title` and `description`
   - Output: The newly created task object with `id`, `completed` (default `false`), and `createdAt`.

2. **Retrieve all tasks**
   - Input: None
   - Output: List of all task objects.

3. **Update a task**
   - Input: `id` and any of the fields (`title`, `description`, `completed`)
   - Output: The updated task object. If the task does not exist, return an error.

4. **Delete a task**
   - Input: `id`
   - Output: Confirmation of deletion. If the task does not exist, return an error.

### Constraints
- `title` and `description` are non-empty strings.
- Task `id`s are unique strings.
- All timestamps should be in ISO 8601 format.

### Example

#### Input
```json
POST /tasks
{
  "title": "Finish project",
  "description": "Complete the project by end of the week"
}
d
d
d
d
dd
ds
dd
d
d

