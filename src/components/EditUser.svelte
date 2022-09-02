<script lang="ts">
    import { slide } from "svelte/transition";
    import { pop } from "svelte-spa-router";
    import type { User } from "../models/User";
    import { findOne, update } from "../stores/Users";
    import { onMount } from "svelte";

    let editUser: User;

    let originalUser: User | null;

    function resetChangesHandler() {
        editUser = { ...originalUser };
    }

    async function saveChangesHandler() {
        await update(editUser);
        pop();
    }

    interface Params {
        id?: number;
    }

    export let params: Params = {};

    onMount(() => {
        originalUser = findOne(params.id);
        editUser = { ...originalUser };
    });
</script>

{#if originalUser != null}
    <div
        class="container mx-auto flex flex-row justify-center py-8"
        transition:slide
    >
        <div class="block p-6 rounded-lg shadow-lg bg-white max-w-md">
            <div class="form-group mb-6">
                <input
                    bind:value={editUser.first_name}
                    type="text"
                    class="form-control block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="firstname"
                    placeholder="Имя"
                />
            </div>
            <div class="form-group mb-6">
                <input
                    bind:value={editUser.last_name}
                    type="text"
                    class="form-control block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="lastname"
                    placeholder="Фамилия"
                />
            </div>
            <div class="form-group mb-6">
                <input
                    bind:value={editUser.patronymic}
                    type="text"
                    class="form-control block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="patronymic"
                    placeholder="Отчество"
                />
            </div>
            <div class="form-group mb-6">
                <textarea
                    bind:value={editUser.notes}
                    class="
              form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                    id="notes"
                    rows="3"
                    placeholder="Заметки"
                />
            </div>

            <div class="flex flex-row flex-nowrap gap-x-2">
                <button
                    on:click={() => pop()}
                    class="
            w-full
            px-6
            py-2.5
            bg-red-500
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-red-700 hover:shadow-lg
            focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-red-800 active:shadow-lg
            transition
            duration-150
            ease-in-out">Отменить</button
                >

                <button
                    on:click={resetChangesHandler}
                    type="submit"
                    class="
            w-full
            px-6
            py-2.5
            bg-yellow-500
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-yellow-600 hover:shadow-lg
            focus:bg-orange-600 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-orange-800 active:shadow-lg
            transition
            duration-150
            ease-in-out">Сбросить</button
                >

                <button
                    on:click={saveChangesHandler}
                    type="submit"
                    class="
            w-full
            px-6
            py-2.5
            bg-green-600
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-green-700 hover:shadow-lg
            focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-green-800 active:shadow-lg
            transition
            duration-150
            ease-in-out">Сохранить</button
                >
            </div>
        </div>
    </div>
{/if}
