"use client"
import React, { useState } from 'react';
import { trpc } from '../_trpc/client';
import { todo } from 'node:test';
import { serverClient } from '../_trpc/serverClient';

const TodoList = ({ initialTodos }: { initialTodos: Awaited<ReturnType<(typeof serverClient)["getTodos"]>> }) => {
    const [content, setContent] = useState("")
    // const { data: todos, isLoading, error } = trpc.getTodos.useQuery();
    const getTodos = trpc.getTodos.useQuery(undefined, {
        initialData: initialTodos,
        refetchOnMount: false,
        refetchOnReconnect: false
    })
    const addTodo = trpc.addTodos.useMutation({
        onSettled: () => {
            getTodos?.refetch();
        }
    });
    const setDone = trpc.doneTodos.useMutation({
        onSettled: () => {
            getTodos?.refetch();
        }
    })

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }
    console.log(getTodos);
    return (
        <div>
            <p className='text-2xl'>Todo List</p>
            <ul>
                {getTodos && getTodos?.data?.map((item) => (
                    <div key={item.id} className=' flex gap-2 align-center'>
                        <input type="checkbox" id={`check-${item.id}`} onChange={async () => setDone.mutate({
                            id: item.id,
                            done: item.done ? 0 : 1
                        })} />
                        <label className='text-lg' htmlFor={`check-${item.id}`}>{item.content}</label>
                    </div>
                ))}
            </ul>
            <div>
                <input id="content" value={content} onChange={(e) => setContent(e.target.value)} className='text-black p-2 me-4 rounded-md' />
                <button onClick={async () => {
                    if (content.length) {
                        addTodo.mutate(content);
                        setContent("");
                    }
                }}
                    className='p-2 bg-red-600 my-2 rounded-md'
                >Add Todo</button>
            </div>
        </div>
    );
};

export default TodoList;
