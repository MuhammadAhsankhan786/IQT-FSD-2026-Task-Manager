# IQT-FSD-2026 Database Schema Documentation

This document describes the database design and schema used in the Full Stack Task Manager. The backend interfaces with MongoDB via the Mongoose Object-Document Mapper (ODM).

---

## Database Connection
- **Provider**: MongoDB Atlas Cloud
- **Connection Client**: Mongoose (v9.x)
- **Database Name**: `taskmanager` (default or specified in the URI connection string)

---

## Entities

### `Task` Collection
Stores task information for the workspace.

#### Schema Structure (JSON Representation)
```json
{
  "_id": "ObjectId",
  "title": "String",
  "completed": "Boolean",
  "createdAt": "Date",
  "updatedAt": "Date",
  "__v": "Number"
}
```

#### Detailed Field Descriptions

| Field Name  | Data Type | Constraints / Options | Default Value | Description |
| :---        | :---      | :---                  | :---          | :---        |
| `_id`       | `ObjectId`| Primary Key, Auto-Gen | *Auto*        | Mongoose generated identifier for the document. |
| `title`     | `String`  | Required, Trimmed     | *None*        | The text title describing the task. |
| `completed` | `Boolean` | Optional              | `false`       | Indicates if the task has been checked off. |
| `createdAt` | `Date`    | Auto-Gen Timestamp    | *Auto*        | Timestamp indicating when the task was added. |
| `updatedAt` | `Date`    | Auto-Gen Timestamp    | *Auto*        | Timestamp indicating when the task was updated. |

---

## Schema Rules and Validations
1. **Title Validation**:
   - Must be a string.
   - Required: Document creation will reject requests missing a `title` field.
   - Trimmed: Leading and trailing whitespaces are automatically removed prior to database insertion.
   - Validation Middleware: Checked at the Express API layer via `validateCreateTask` and `validateUpdateTask` to return immediate HTTP 400 responses.
2. **Timestamps**:
   - Configured with `{ timestamps: true }` in the Mongoose schema, which automatically populates and updates the `createdAt` and `updatedAt` Date values.
