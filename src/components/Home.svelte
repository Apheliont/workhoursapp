<script lang="ts">
    import MonthView from "./calendar/MonthView.svelte";

    let selectedDate = new Date();

    $: yearAndMonth = selectedDate.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
    });
</script>

<div class="lg:flex lg:h-full lg:flex-col">
    <header
        class="relative z-20 flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none"
    >
        <h1 class="text-lg font-semibold text-gray-900">
            {yearAndMonth.charAt(0).toUpperCase() + yearAndMonth.slice(1)}
        </h1>
        <div class="flex items-center">
            <div
                class="flex items-center rounded-md shadow-sm md:items-stretch"
            >
                <button
                    on:click={() => { selectedDate.setMonth(selectedDate.getMonth() - 1); selectedDate = selectedDate;}}
                    type="button"
                    class="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
                >
                    <span class="sr-only">Предыдущий месяц</span>
                    <!-- Heroicon name: solid/chevron-left -->
                    <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
                <button
                    type="button"
                    class="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
                    >Today</button
                >
                <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
                <button
                    on:click={() => { 
                        selectedDate.setMonth(selectedDate.getMonth() + 1); selectedDate = selectedDate;}}
                    type="button"
                    class="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
                >
                    <span class="sr-only">Следующий месяц</span>
                    <!-- Heroicon name: solid/chevron-right -->
                    <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            <div class="hidden md:ml-4 md:flex md:items-center">
                <div class="relative">
                    <button
                        type="button"
                        class="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        id="menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                    >
                        Month view
                        <!-- Heroicon name: solid/chevron-down -->
                        <svg
                            class="ml-2 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </button>

                    <!--
              Dropdown menu, show/hide based on menu state.
  
              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
                    <div
                        class="focus:outline-none absolute right-0 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabindex="-1"
                    >
                        <div class="py-1" role="none">
                            <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                            <a
                                href="#"
                                class="text-gray-700 block px-4 py-2 text-sm"
                                role="menuitem"
                                tabindex="-1"
                                id="menu-item-0">Day view</a
                            >
                            <a
                                href="#"
                                class="text-gray-700 block px-4 py-2 text-sm"
                                role="menuitem"
                                tabindex="-1"
                                id="menu-item-1">Week view</a
                            >
                            <a
                                href="#"
                                class="text-gray-700 block px-4 py-2 text-sm"
                                role="menuitem"
                                tabindex="-1"
                                id="menu-item-2">Month view</a
                            >
                            <a
                                href="#"
                                class="text-gray-700 block px-4 py-2 text-sm"
                                role="menuitem"
                                tabindex="-1"
                                id="menu-item-3">Year view</a
                            >
                        </div>
                    </div>
                </div>
                <div class="ml-6 h-6 w-px bg-gray-300" />
                <button
                    type="button"
                    class="focus:outline-none ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >Add event</button
                >
            </div>
            <div class="relative ml-6 md:hidden">
                <button
                    type="button"
                    class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500"
                    id="menu-0-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                >
                    <span class="sr-only">Open menu</span>
                    <!-- Heroicon name: solid/dots-horizontal -->
                    <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
                        />
                    </svg>
                </button>

                <!--
            Dropdown menu, show/hide based on menu state.
  
            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          -->
                <div
                    class="focus:outline-none absolute right-0 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-0-button"
                    tabindex="-1"
                >
                    <div class="py-1" role="none">
                        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                        <a
                            href="#"
                            class="text-gray-700 block px-4 py-2 text-sm"
                            role="menuitem"
                            tabindex="-1"
                            id="menu-0-item-0">Create event</a
                        >
                    </div>
                    <div class="py-1" role="none">
                        <a
                            href="#"
                            class="text-gray-700 block px-4 py-2 text-sm"
                            role="menuitem"
                            tabindex="-1"
                            id="menu-0-item-1">Go to today</a
                        >
                    </div>
                    <div class="py-1" role="none">
                        <a
                            href="#"
                            class="text-gray-700 block px-4 py-2 text-sm"
                            role="menuitem"
                            tabindex="-1"
                            id="menu-0-item-2">Day view</a
                        >
                        <a
                            href="#"
                            class="text-gray-700 block px-4 py-2 text-sm"
                            role="menuitem"
                            tabindex="-1"
                            id="menu-0-item-3">Week view</a
                        >
                        <a
                            href="#"
                            class="text-gray-700 block px-4 py-2 text-sm"
                            role="menuitem"
                            tabindex="-1"
                            id="menu-0-item-4">Month view</a
                        >
                        <a
                            href="#"
                            class="text-gray-700 block px-4 py-2 text-sm"
                            role="menuitem"
                            tabindex="-1"
                            id="menu-0-item-5">Year view</a
                        >
                    </div>
                </div>
            </div>
        </div>
    </header>
    <MonthView selectedDate={selectedDate} />
</div>
