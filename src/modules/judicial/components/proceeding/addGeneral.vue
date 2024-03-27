<template>
    <div id="main-content" class="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
        <section class="bg-gray-50 dark:bg-gray-900 px-8 py-10" v-if="currentStep === 1">
            <div class="mx-auto  lg:p-8 p-4 shadow-lg bg-white rounded-lg">
                <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Datos generales</h2>
                <div class="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:gap-6">
                    <div class="lg:col-span-3">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numero de
                            Expediente</label>
                        <input type="text" name="name" id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="" v-model="proceeding.number">
                    </div>
                    <div class="w-full">
                        <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de
                            Inicio</label>
                        <input type="date" name="brand" id="brand"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="" v-model="proceeding.start_date">
                    </div>
                    <div>
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pretension</label>
                        <select id="category" v-model="proceeding.claim_id"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option disabled value="" selected>--Seleccionar</option>
                            <option v-for="item in claims" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div class="w-full">
                        <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Monto de
                            Pretension</label>
                        <input type="number" name="price" id="price"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="S/ 2999" v-model="proceeding.claim_amount">
                    </div>
                    <div>
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Materia</label>
                        <select v-model="proceeding.subject_id"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option disabled value="" selected>--Seleccionar</option>
                            <option v-for="item in subjects" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Distrito
                            Judicial</label>
                        <select id="category"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            @change="handleDistrictChange" v-model="proceeding.judicial_district_id">
                            <option disabled value="">--Seleccionar</option>
                            <option v-for="item in judicialDistricts" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instancia</label>
                        <select id="category"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="">--Seleccionar</option>
                            <option v-for="item in instances" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Especialidad</label>
                        <select id="category"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="">--Seleccionar</option>
                            <option v-for="item in specialties" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Organo
                            Jurisdiccional</label>
                        <select id="category"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="" v-if="courts.length === 0">--Seleccione un Distrito Judicial
                            </option>
                            <option selected="" v-else>--Seleccionar</option>
                            <option v-for="item in courts" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
                        <select id="category"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="">--Seleccionar</option>
                            <option v-for="item in status" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                </div>

                <button type="button"
                    class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    @click="nextStep">
                    Siguiente
                </button>
            </div>
        </section>
        <section class="bg-gray-50 dark:bg-gray-900 px-8 py-10" v-if="currentStep === 2">
            <div class="mx-auto  lg:p-8 p-4 shadow-md bg-white rounded-lg">
                <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Partes Procesales</h2>
                <div class="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:gap-6">
                    <div class="lg:col-span-3">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numero de
                            Expediente</label>
                        <input type="text" name="name" id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="" v-model="proceeding.number">
                    </div>
                    <div class="w-full">
                        <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de
                            Inicio</label>
                        <input type="date" name="brand" id="brand"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="" v-model="proceeding.start_date">
                    </div>
                    <div>
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pretension</label>
                        <select id="category" v-model="proceeding.claim_id"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option disabled value="" selected>--Seleccionar</option>
                            <option v-for="item in claims" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div class="w-full">
                        <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Monto de
                            Pretension</label>
                        <input type="number" name="price" id="price"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="S/ 2999" v-model="proceeding.claim_amount">
                    </div>
                    <div>
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Materia</label>
                        <select v-model="proceeding.subject_id"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option disabled value="" selected>--Seleccionar</option>
                            <option v-for="item in subjects" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Distrito
                            Judicial</label>
                        <select id="category"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            @change="handleDistrictChange" v-model="proceeding.judicial_district_id">
                            <option disabled value="">--Seleccionar</option>
                            <option v-for="item in judicialDistricts" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instancia</label>
                        <select id="category"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="">--Seleccionar</option>
                            <option v-for="item in instances" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Especialidad</label>
                        <select id="category"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="">--Seleccionar</option>
                            <option v-for="item in specialties" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Organo
                            Jurisdiccional</label>
                        <select id="category"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="" v-if="courts.length === 0">--Seleccione un Distrito Judicial
                            </option>
                            <option selected="" v-else>--Seleccionar</option>
                            <option v-for="item in courts" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
                        <select id="category"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="">--Seleccionar</option>
                            <option v-for="item in status" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <button type="button"
                    class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    @click="prevStep">Anterior</button>
                <button type="button"
                    class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    @click="nextStep">
                    Siguiente
                </button>
            </div>
        </section>
        <section class="bg-gray-50 dark:bg-gray-900 px-8 py-10" v-if="currentStep === 3">
            <div class="mx-auto  lg:p-8 p-4 shadow-md bg-white rounded-lg">
                <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Asignacion de abogado</h2>
                <div class="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:gap-6">
                    <div class="lg:col-span-3">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numero de
                            Expediente</label>
                        <input type="text" name="name" id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="" v-model="proceeding.number">
                    </div>
                    <div class="w-full">
                        <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de
                            Inicio</label>
                        <input type="date" name="brand" id="brand"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="" v-model="proceeding.start_date">
                    </div>
                    <div>
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pretension</label>
                        <select id="category" v-model="proceeding.claim_id"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option disabled value="" selected>--Seleccionar</option>
                            <option v-for="item in claims" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div class="w-full">
                        <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Monto de
                            Pretension</label>
                        <input type="number" name="price" id="price"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="S/ 2999" v-model="proceeding.claim_amount">
                    </div>
                    <div>
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Materia</label>
                        <select v-model="proceeding.subject_id"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option disabled value="" selected>--Seleccionar</option>
                            <option v-for="item in subjects" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Distrito
                            Judicial</label>
                        <select id="category"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            @change="handleDistrictChange" v-model="proceeding.judicial_district_id">
                            <option disabled value="">--Seleccionar</option>
                            <option v-for="item in judicialDistricts" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instancia</label>
                        <select id="category"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="">--Seleccionar</option>
                            <option v-for="item in instances" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Especialidad</label>
                        <select id="category"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="">--Seleccionar</option>
                            <option v-for="item in specialties" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Organo
                            Jurisdiccional</label>
                        <select id="category"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="" v-if="courts.length === 0">--Seleccione un Distrito Judicial
                            </option>
                            <option selected="" v-else>--Seleccionar</option>
                            <option v-for="item in courts" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
                        <select id="category"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="">--Seleccionar</option>
                            <option v-for="item in status" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <button type="button"
                    class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    @click="prevStep">Anterior</button>
                <button type="button"
                    class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    @click="saveProceeding">
                    Registrar expediente
                </button>
            </div>
        </section>
        <div class="card flex justify-content-center">


            <!-- Modal toggle -->
            <!-- <button @click="visible = true"
                class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button">
                Toggle modal
            </button>

            <div v-show="visible" tabindex="-1" aria-hidden="true"
                class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative p-4 w-full max-w-2xl max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div
                            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Terms of Service
                            </h3>
                            <button type="button"
                                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                @click="closeModal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div class="p-4 md:p-5 space-y-4">
                            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                With less than a month to go before the European Union enacts new consumer privacy laws
                                for its citizens, companies around the world are updating their terms of service
                                agreements to comply.
                            </p>
                            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on
                                May 25 and is meant to ensure a common set of data rights in the European Union. It
                                requires organizations to notify users as soon as possible of high-risk data breaches
                                that could personally affect them.
                            </p>
                        </div>
                        <div
                            class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="default-modal" type="button"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I
                                accept</button>
                            <button data-modal-hide="default-modal" type="button"
                                class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
                        </div>
                    </div>
                </div>
            </div> -->

        </div>
    </div>
</template>
<script>
import axios from 'axios';
import statusData from '@/data/status_proceeding.json';

export default {
    components: {
    },
    data() {
        return {
            visible: false,
            currentStep: 1,
            claims: '',
            subjects: '',
            judicialDistricts: '',
            instances: '',
            specialties: '',
            courts: '',
            status: statusData,
            proceeding: {
                number: '',
                start_date: '',
                claim_id: '',
                claim_amount: '',
                subject_id: '',
                judicial_district_id: '',
                instance_id: '',
                specialty_id: '',
                court_id: '',
                status: '',
                collective: '',
                lawyer_id: '',
                company_id: '',
                proceeding_type_id: ''
            }
        }
    },
    mounted() {
        this.fecthClaims();
        this.fecthSubjects();
        this.fecthJudicialDistrics();
        this.fecthInstances();
        this.fecthSpecialties();
        this.fecthInstances();

    },
    methods: {
        closeModal() {
            this.visible = false;
        },
        acceptTerms() {
            // Lógica para aceptar los términos
            console.log('Términos aceptados');
            this.closeModal();
        },
        declineTerms() {
            // Lógica para rechazar los términos
            console.log('Términos rechazados');
            this.closeModal();
        },
        nextStep() {
            this.currentStep += 1;
        },

        prevStep() {
            if (this.currentStep > 0) {
                this.currentStep -= 1;
            }
        },
        async fecthClaims() {
            try {
                const response = await axios.get('claim');
                console.log(response.data);
                this.claims = response.data.data;
            } catch (error) {
                console.error('Error al obtener la lista de materias:', error);
            }
        },

        async fecthSubjects() {
            try {
                const response = await axios.get('subject');
                this.subjects = response.data.data;
            } catch (error) {
                console.error('Error al obtener la lista de productos:', error);
            }
        },

        async fecthJudicialDistrics() {
            try {
                const response = await axios.get('judicialDistric');
                this.judicialDistricts = response.data.data;
            } catch (error) {
                console.error('Error al obtener la lista de productos:', error);
            }
        },

        async fecthInstances() {
            try {
                const response = await axios.get('instance');
                this.instances = response.data.data;
            } catch (error) {
                console.error('Error al obtener la lista de productos:', error);
            }
        },

        async fecthSpecialties() {
            try {
                const response = await axios.get('specialty');
                this.specialties = response.data.data;
            } catch (error) {
                console.error('Error al obtener la lista de productos:', error);
            }
        },

        async fecthCourts(id) {
            try {
                const response = await axios.get(`court/showJudicialDistrict/${id}`);
                this.courts = response.data.data;
            } catch (error) {
                console.error('Error al obtener la lista de juszgados:', error);
            }
        },

        handleDistrictChange() {
            this.fecthCourts(this.proceeding.judicial_district_id);
        },

        saveProceeding() {
            console.log('registranto expediente...');
        }
    },
}
</script>
