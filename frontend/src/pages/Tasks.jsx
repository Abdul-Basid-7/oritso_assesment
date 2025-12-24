import { useEffect, useState } from 'react';
import api from '../api/api';
import { useAuth } from '../auth/AuthContext';

export default function Tasks() {
  const { logout } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    due_date: '',
    remarks: '',
    status: 'Pending',
  });

  const loadTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const searchTasks = async () => {
    if (!search.trim()) {
      loadTasks();
      return;
    }
    const res = await api.get(`/tasks/search?title=${search}`);
    setTasks(res.data);
  };

  const submitTask = async () => {
    if (editingId) {
      await api.put(`/tasks/${editingId}`, form);
    } else {
      await api.post('/tasks', { ...form, status: 'Pending' });
    }

    setForm({
      title: '',
      description: '',
      due_date: '',
      remarks: '',
      status: 'Pending',
    });
    setEditingId(null);
    loadTasks();
  };

  const editTask = (task) => {
    setEditingId(task.id);
    setForm({
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      remarks: task.remarks,
      status: task.status,
    });
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  const isOverdue = (date) => {
    return new Date(date) < new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50">
      {/* HEADER */}
      <div className="bg-white/70 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Task Management System
          </h1>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 grid lg:grid-cols-3 gap-8">
        {/* FORM */}
        <div className="bg-white/80 backdrop-blur rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-6">
            {editingId ? 'Update Task' : 'Create Task'}
          </h2>

          <div className="space-y-6">
            <input
              className="w-full bg-transparent border-b-2 border-slate-300 focus:border-blue-600 outline-none py-1"
              placeholder="Task Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <textarea
              className="w-full bg-transparent border-b-2 border-slate-300 focus:border-blue-600 outline-none py-1 resize-none"
              placeholder="Task Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
              type="date"
              className="w-full bg-transparent border-b-2 border-slate-300 focus:border-blue-600 outline-none py-1"
              value={form.due_date}
              onChange={(e) =>
                setForm({ ...form, due_date: e.target.value })
              }
            />

            <textarea
              className="w-full bg-transparent border-b-2 border-slate-300 focus:border-blue-600 outline-none py-1 resize-none"
              placeholder="Remarks"
              value={form.remarks}
              onChange={(e) => setForm({ ...form, remarks: e.target.value })}
            />

            {editingId && (
              <select
                className="w-full bg-transparent border-b-2 border-slate-300 focus:border-blue-600 outline-none py-1"
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            )}

            <button
              onClick={submitTask}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg shadow hover:opacity-90"
            >
              {editingId ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </div>

        {/* TASK LIST */}
        <div className="lg:col-span-2">
          {/* SEARCH */}
          <div className="bg-white/80 backdrop-blur rounded-xl shadow p-4 mb-6 flex gap-3">
            <input
              className="flex-1 bg-transparent border-b-2 border-slate-300 focus:border-blue-600 outline-none py-1"
              placeholder="Search task by title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={searchTasks}
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              Search
            </button>
          </div>

          {/* TASK CARDS */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white/80 backdrop-blur rounded-xl shadow-md p-4 hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg">{task.title}</h3>

                <p className="text-sm text-slate-600 mt-1">
                  {task.description}
                </p>

                {/* DUE DATE */}
                {task.due_date && (
                  <>
                    <p className="mt-2 text-sm">
                      <span className="font-medium">📅 Due:</span>{' '}
                      {new Date(task.due_date).toLocaleDateString()}
                    </p>

                    <p
                      className={`text-xs mt-1 ${
                        isOverdue(task.due_date)
                          ? 'text-red-600'
                          : 'text-green-600'
                      }`}
                    >
                      {isOverdue(task.due_date)
                        ? '⚠️ Overdue'
                        : '⏳ Upcoming'}
                    </p>
                  </>
                )}

                <p className="text-sm mt-2">
                  <span className="font-medium">Remarks:</span>{' '}
                  {task.remarks}
                </p>

                <span
                  className={`inline-block mt-3 px-3 py-1 text-xs rounded-full
                  ${
                    task.status === 'Completed'
                      ? 'bg-green-100 text-green-700'
                      : task.status === 'In Progress'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {task.status}
                </span>

                <div className="mt-3 text-xs text-slate-500 space-y-1">
                  <p>
                    Created By: {task.created_by_name} (ID:{' '}
                    {task.created_by})
                  </p>
                  <p>
                    Updated By: {task.updated_by_name} (ID:{' '}
                    {task.updated_by})
                  </p>
                  <p>Created On: {task.created_at}</p>
                  <p>Updated On: {task.updated_at}</p>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => editTask(task)}
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-sm py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {tasks.length === 0 && (
            <p className="text-center text-slate-500 mt-10">
              No tasks found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
