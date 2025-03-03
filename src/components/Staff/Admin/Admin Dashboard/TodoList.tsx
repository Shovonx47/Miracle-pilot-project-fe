"use client";
import React, { useState } from 'react';
import { Check } from 'lucide-react';

const TodoList = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      task: "Join Sports Program",
      time: "01:00 PM",
      status: "Completed"
    },
    {
      id: 2,
      task: "Create Study Routine",
      time: "04:50 PM",
      status: "In Progress"
    },
    {
      id: 3,
      task: "Complete Sakib Sir's Homework",
      time: "05:55 PM",
      status: "Yet To Start"
    },
    {
      id: 4,
      task: "Practice for Upcoming Math Test",
      time: "06:02 PM",
      status: "Yet To Start"
    },
    {
      id: 5,
      task: "Dinner at Hall-room",
      time: "07:00 PM",
      status: "Yet To Start"
    }
  ]);

  const toggleTodoStatus = (id: number) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          status: todo.status === 'Completed' ? 'Yet To Start' : 'Completed'
        };
      }
      return todo;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-600';
      case 'In Progress':
        return 'bg-blue-100 text-blue-600';
      case 'Yet To Start':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Todo</h3>
        <select className="text-sm text-gray-500 border-none bg-transparent outline-none cursor-pointer">
          <option>Today</option>
        </select>
      </div>

      <div className="mt-4 divide-y divide-gray-100">
        {todos.map((todo) => (
          <div key={todo.id} className="py-3 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div 
                  onClick={() => toggleTodoStatus(todo.id)}
                  className={`w-5 h-5 rounded border ${
                    todo.status === 'Completed'
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300'
                  } flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors`}
                >
                  {todo.status === 'Completed' && (
                    <Check className="h-4 w-4 text-white" />
                  )}
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${
                    todo.status === 'Completed' ? 'text-gray-500' : 'text-gray-900'
                  }`}>
                    {todo.task}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-md ${getStatusColor(todo.status)}`}>
                    {todo.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {todo.time}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;