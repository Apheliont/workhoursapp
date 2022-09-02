<script lang="ts">
  import { onMount } from "svelte";
  import { users, getAll, remove } from "../stores/Users";
  import { slide } from "svelte/transition";
  import TrashIcon from "./icons/TrashIcon.svelte";
  import AddUserIcon from "./icons/AddUserIcon.svelte";
  import { push } from "svelte-spa-router";
  import EditIcon from "./icons/EditIcon.svelte";

  onMount(getAll);

  let userIdToDelete: number | null = null;

  function removeuserHandler() {
    if (userIdToDelete !== null) {
      remove(userIdToDelete);
    }
  }
</script>

<input type="checkbox" id="beforeRemoveUser" class="modal-toggle" />
<div class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-xl">Вы собираетесь удалить сотрудника!</h3>
    <p class="py-4">
      После удаления, все данные статистики по конкретному сотруднику будут
      полностью удалены. Вы уверены?
    </p>
    <div class="modal-action">
      <label
        for="beforeRemoveUser"
        class="btn bg-red-600 border-0 hover:bg-red-700"
        on:click={removeuserHandler}>Да</label
      >
      <label
        for="beforeRemoveUser"
        class="btn bg-gray-600 border-0 hover:bg-gray-700"
        on:click={() => {
          userIdToDelete = null;
        }}>Отмена</label
      >
    </div>
  </div>
</div>

<div class="overflow-x-auto" in:slide>
  <div class="flex flex-row-reverse space-x-2 justify-right py-2 px-4">
    <button
      on:click={() => push("/users/add")}
      class="btn gap-2 bg-indigo-600 text-white font-medium text-xs hover:bg-indigo-700"
    >
      <AddUserIcon />
      Новый сотрудник
    </button>
  </div>

  <table class="table w-full border-collapse border">
    <thead>
      <tr>
        <th class="border border-slate-300 text-center">#</th>
        <th class="border border-slate-300">Фио</th>
        <th class="border border-slate-300">Дата добавления</th>
        <th class="border border-slate-300">Дата изменения</th>
        <th class="border border-slate-300 text-center">Действия</th>
      </tr>
    </thead>
    <tbody>
      {#each $users as user, idx (user.id)}
        <tr>
          <td class="border border-slate-300 text-center">{idx + 1}</td>
          <td class="border border-slate-300">
            {user.first_name}
            {user.last_name}
            {user.patronymic}
          </td>
          <td class="border border-slate-300">
            {user.created_at}
          </td>
          <td class="border border-slate-300">
            {user.updated_at}
          </td>
          <td class="border border-slate-300 text-center">
            <div class="flex flex-row -flex-nowrap justify-center gap-2">
              <button
                class="w-5 h-5 border-0"
                on:click={() => {
                  push(`/users/edit/${user.id}`);
                }}
              >
                <label for="beforeRemoveUser" class="modal-button">
                  <EditIcon class="hover:text-orange-500 cursor-pointer" />
                </label>
              </button>

              <button
                class="w-5 h-5 border-0"
                on:click={() => {
                  userIdToDelete = user.id;
                }}
              >
                <label for="beforeRemoveUser" class="modal-button">
                  <TrashIcon class="hover:text-red-500 cursor-pointer" />
                </label>
              </button>
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
