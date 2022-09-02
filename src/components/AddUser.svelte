<script lang="ts">
    import { slide } from "svelte/transition";
    import { pop } from "svelte-spa-router";
    import type { NewUser } from "../models/User";
    import { add } from "../stores/Users";

    const newUser: NewUser = {
        first_name: "",
        last_name: "",
        patronymic: "",
        notes: "",
    };

    function addUserHandler() {
        add(newUser);
        pop();
    }
</script>

<div
    class="container mx-auto flex flex-row justify-center py-8"
    transition:slide
>
    <div class="block p-6 rounded-lg shadow-lg bg-white max-w-md">
        <div class="form-group mb-6">
            <input
                bind:value={newUser.first_name}
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
                bind:value={newUser.last_name}
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
                bind:value={newUser.patronymic}
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
                bind:value={newUser.notes}
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

        <div class="flex flex-row flex-nowrap gap-x-8">
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
                on:click={addUserHandler}
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
