import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import {Link, router, usePage} from "@inertiajs/react";
import {TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP} from "@/constants";

interface Task {
  id: number;
  image_path: string;
  project: { name: string };
  name: string;
  status: "pending" | "in_progress" | "completed";
  created_at: string;
  due_date: string;
  createdBy: { id: number; name: string }; // For ownership check
  assignedUser?: { id: number; name: string }; // Added assigned user
}

interface TasksTableProps {
  tasks: { data: Task[]; meta: { links: any[] } };
  authUser: { id: number; role: string }; // Authenticated user details
  success?: string;
  queryParams?: { [key: string]: any } | null;
  hideProjectColumn?: boolean; // Option to hide project column
}

export default function TasksTable({
                                     tasks,
                                     authUser,
                                     success,
                                     queryParams = null,
                                     hideProjectColumn = false,
                                   }: TasksTableProps) {
  const {url} = usePage();
  queryParams = queryParams || {};

  const determineRoute = (url: string): string => {
    const basePath = url.split("?")[0];

    if (basePath.endsWith("/my-tasks")) {
      return "task.myTasks";
    } else if (basePath.endsWith("/task")) {
      return "task.index";
    } else {
      throw new Error(`Unknown route for base path: ${basePath}`);
    }
  };

  const searchFieldChanged = (name: string, value: string) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route(determineRoute(url)), queryParams ?? {});
  };

  const onKeyPress = (name: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, (e.target as HTMLInputElement).value);
  };

  const sortChanged = (name: string) => {
    if (name === queryParams.sort_field) {
      queryParams.sort_direction = queryParams.sort_direction === "asc" ? "desc" : "asc";
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route(determineRoute(url)), queryParams ?? {});
  };

  const deleteTask = (task: Task) => {
    if (!window.confirm("Are you sure you want to delete the task?")) return;
    router.delete(route("task.destroy", task.id));
  };

  return (
    <>
      {success && (
        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
          {success}
        </div>
      )}

        <div className="overflow-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead
              className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr>
              <TableHeading
                name="id"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                ID
              </TableHeading>
              <th className="px-3 py-3">Image</th>
              {!hideProjectColumn && <th className="px-3 py-3">Project Name</th>}
              <TableHeading
                name="name"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Name
              </TableHeading>
              <TableHeading
                name="status"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Status
              </TableHeading>
              <TableHeading
                name="created_at"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Create Date
              </TableHeading>
              <TableHeading
                name="due_date"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Due Date
              </TableHeading>
              <th className="px-3 py-3">Created By</th>
              <th className="px-3 py-3">Assigned To</th>
              <th className={authUser.role === "ADMIN" ? "px-3 py-3 text-nowrap" : "px-3 py-3 text-right"}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {tasks.data.map((task) => (
              <tr
                key={task.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-3 py-2">{task.id}</td>
                <td className="px-3 py-2">
                  <img
                    src={task.image_path}
                    alt="Task"
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                {!hideProjectColumn && <td className="px-3 py-2">{task.project.name}</td>}
                <th className="px-3 py-2 text-gray-100 hover:underline">
                  <Link href={route("task.show", task.id)}>{task.name}</Link>
                </th>
                <td className="px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white ${TASK_STATUS_CLASS_MAP[task.status]}`}
                  >
                    {TASK_STATUS_TEXT_MAP[task.status]}
                  </span>
                </td>
                <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
                <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                <td className="px-3 py-2">{task.createdBy.name}</td>
                <td className="px-3 py-2">{task.assignedUser?.name || "Unassigned"}</td>
                <td className={authUser.role === "ADMIN" ? "px-3 py-2 text-nowrap" : "px-3 py-2 text-right"}>
                  {task.assignedUser?.id === authUser.id && (
                    <Link
                      href={route("task.edit", task.id)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                    >
                      Edit
                    </Link>
                  )}
                  {(authUser.role === "ADMIN" || task.createdBy.id === authUser.id) && (
                    <button
                      onClick={() => deleteTask(task)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <Pagination links={tasks.meta.links}/>
    </>
  );
}
