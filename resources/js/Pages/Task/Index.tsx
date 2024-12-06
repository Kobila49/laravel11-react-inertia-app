import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, router} from "@inertiajs/react";
import TasksTable from "./TasksTable";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";

interface Task {
  id: number;
  image_path: string;
  project: { name: string };
  name: string;
  status: "pending" | "in_progress" | "completed";
  created_at: string;
  due_date: string;
  createdBy: { name: string };
}

interface IndexProps {
  auth: { user: { id: number, name: string, role: string } };
  success?: string;
  tasks: { data: Task[]; meta: { links: any[] } };
  queryParams?: { [key: string]: any } | null;
}

export default function Index({auth, success, tasks, queryParams = {}}: IndexProps) {
  queryParams = queryParams ?? {};

  const searchFieldChanged = (name: keyof IndexProps["queryParams"], value: string) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("task.index"), queryParams);
  };

  const onKeyPress = (name: keyof IndexProps["queryParams"], e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    // @ts-ignore
    searchFieldChanged(name, e.target.value);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Tasks
          </h2>
          <Link
            href={route("task.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Tasks"/>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
              {success}
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="flex gap-4 mb-6">
                <TextInput
                  className="w-full"
                  defaultValue={queryParams.name}
                  placeholder="Task Name"
                  onBlur={(e: any) => searchFieldChanged("name", e.target.value)}
                  onKeyPress={(e: any) => onKeyPress("name", e)}
                />
                <SelectInput
                  className="w-full"
                  defaultValue={queryParams.status}
                  onChange={(e: any) => searchFieldChanged("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
              </div>
              <TasksTable
                tasks={tasks}
                authUser={auth.user} // Pass the auth user
                queryParams={queryParams}
                success={success}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
