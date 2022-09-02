<script lang="ts">
    import type { Day } from "../../models/Day";

    const allDays: string[] = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
    export let selectedDate: Date;
    $: currentMonthNumberOfDays = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    $: firstDayName = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
    ).toLocaleDateString("ru-RU", {
        weekday: "short",
    });

    $: lastDayName = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        currentMonthNumberOfDays
    ).toLocaleDateString("ru-RU", {
        weekday: "short",
    });

    $: idxOfFirstDayOfMonth = allDays.findIndex((day) => day === firstDayName);

    $: idxOfLastDayOfMonth = allDays.findIndex((day) => day === lastDayName);

    let daysToShow: Day[];
    $: {
        daysToShow = [];
        if (idxOfFirstDayOfMonth !== 0) {
            const prevMonthNumberOfDays = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(), // текущий месяц + 0 день = предыдущий месяц последний день
                0
            ).getDate();
            for (
                let i = prevMonthNumberOfDays - (idxOfFirstDayOfMonth - 1);
                i <= prevMonthNumberOfDays;
                i++
            ) {
                daysToShow.push({
                    cssClass: "bg-gray-50 text-gray-500",
                    date: new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth() - 1,
                        i
                    ),
                    isActive: false,
                });
            }
        }

        for (let i = 1; i <= currentMonthNumberOfDays; i++) {
            daysToShow.push({
                cssClass: "bg-white",
                date: new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    i
                ),
                isActive: true,
            });
        }

        if (idxOfLastDayOfMonth !== allDays.length - 1) {
            for (
                let i = 1;
                i <= (allDays.length - 1) - idxOfLastDayOfMonth;
                i++
            ) {
                daysToShow.push({
                    cssClass: "bg-gray-50 text-gray-500",
                    date: new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth() + 1,
                        i
                    ),
                    isActive: false,
                });
            }
        }
    }
</script>

<div
    class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col"
>
    <div
        class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none"
    >
        <div class="bg-orange-100 py-2">Пн</div>
        <div class="bg-orange-100 py-2">Вт</div>
        <div class="bg-orange-100 py-2">Ср</div>
        <div class="bg-orange-100 py-2">Пт</div>
        <div class="bg-orange-100 py-2">Сб</div>
        <div class="bg-orange-100 py-2">Чт</div>
        <div class="bg-orange-100 py-2">Вс</div>
    </div>
    <div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
        <div
            class="hidden w-full lg:grid lg:grid-cols-7 lg:gap-px"
        >
            <!--
            Always include: "relative py-2 px-3"
            Is current month, include: "bg-white"
            Is not current month, include: "bg-gray-50 text-gray-500"
          -->
            {#each daysToShow as day}
                <div class="relative py-6 px-3 {day.cssClass}">
                    <!--
              Is today, include: "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
            -->
                    <time
                        datetime={`${day.date.getFullYear()}-${day.date.getMonth()}-${day.date.getDay()}`}
                        >{day.date.getDate()}
                    </time>
                </div>
            {/each}
            <!--
              Is today, include: "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
            -->
        </div>
        <div
            class="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden"
        >
            <!--
            Always include: "flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10"
            Is current month, include: "bg-white"
            Is not current month, include: "bg-gray-50"
            Is selected or is today, include: "font-semibold"
            Is selected, include: "text-white"
            Is not selected and is today, include: "text-indigo-600"
            Is not selected and is current month, and is not today, include: "text-gray-900"
            Is not selected, is not current month, and is not today: "text-gray-500"
          -->
            <button
                type="button"
                class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
                <!--
              Always include: "ml-auto"
              Is selected, include: "flex h-6 w-6 items-center justify-center rounded-full"
              Is selected and is today, include: "bg-indigo-600"
              Is selected and is not today, include: "bg-gray-900"
            -->
                <time datetime="2021-12-28" class="ml-auto">27</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2021-12-28" class="ml-auto">28</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2021-12-29" class="ml-auto">29</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2021-12-30" class="ml-auto">30</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2021-12-31" class="ml-auto">31</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-01" class="ml-auto">1</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-02" class="ml-auto">2</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-03" class="ml-auto">3</time>
                <p class="sr-only">2 events</p>
                <div class="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    <div
                        class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                    />
                    <div
                        class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                    />
                </div>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-04" class="ml-auto">4</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-05" class="ml-auto">5</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-06" class="ml-auto">6</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-07" class="ml-auto">7</time>
                <p class="sr-only">1 event</p>
                <div class="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    <div
                        class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                    />
                </div>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-08" class="ml-auto">8</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-09" class="ml-auto">9</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-10" class="ml-auto">10</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-11" class="ml-auto">11</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 font-semibold text-indigo-600 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-12" class="ml-auto">12</time>
                <p class="sr-only">1 event</p>
                <div class="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    <div
                        class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                    />
                </div>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-13" class="ml-auto">13</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-14" class="ml-auto">14</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-15" class="ml-auto">15</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-16" class="ml-auto">16</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-17" class="ml-auto">17</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-18" class="ml-auto">18</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-19" class="ml-auto">19</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-20" class="ml-auto">20</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-21" class="ml-auto">21</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 font-semibold text-white hover:bg-gray-100 focus:z-10"
            >
                <time
                    datetime="2022-01-22"
                    class="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-gray-900"
                    >22</time
                >
                <p class="sr-only">2 events</p>
                <div class="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    <div
                        class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                    />
                    <div
                        class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                    />
                </div>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-23" class="ml-auto">23</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-24" class="ml-auto">24</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-25" class="ml-auto">25</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-26" class="ml-auto">26</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-27" class="ml-auto">27</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-28" class="ml-auto">28</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-29" class="ml-auto">29</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-30" class="ml-auto">30</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-01-31" class="ml-auto">31</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-02-01" class="ml-auto">1</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-02-02" class="ml-auto">2</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-02-03" class="ml-auto">3</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-02-04" class="ml-auto">4</time>
                <p class="sr-only">1 event</p>
                <div class="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    <div
                        class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                    />
                </div>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-02-05" class="ml-auto">5</time>
                <p class="sr-only">0 events</p>
            </button>
            <button
                type="button"
                class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
                <time datetime="2022-02-06" class="ml-auto">6</time>
                <p class="sr-only">0 events</p>
            </button>
        </div>
    </div>
</div>
<div class="py-10 px-4 sm:px-6 lg:hidden">
    <ol
        class="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5"
    >
        <li
            class="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
        >
            <div class="flex-auto">
                <p class="font-semibold text-gray-900">Maple syrup museum</p>
                <time
                    datetime="2022-01-15T09:00"
                    class="mt-2 flex items-center text-gray-700"
                >
                    <!-- Heroicon name: solid/clock -->
                    <svg
                        class="mr-2 h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    3PM
                </time>
            </div>
            <a
                href="#"
                class="ml-6 flex-none self-center rounded-md border border-gray-300 bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100"
                >Edit<span class="sr-only">, Maple syrup museum</span></a
            >
        </li>

        <li
            class="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
        >
            <div class="flex-auto">
                <p class="font-semibold text-gray-900">Hockey game</p>
                <time
                    datetime="2022-01-22T19:00"
                    class="mt-2 flex items-center text-gray-700"
                >
                    <!-- Heroicon name: solid/clock -->
                    <svg
                        class="mr-2 h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    7PM
                </time>
            </div>
            <a
                href="#"
                class="ml-6 flex-none self-center rounded-md border border-gray-300 bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100"
                >Edit<span class="sr-only">, Hockey game</span></a
            >
        </li>
    </ol>
</div>
