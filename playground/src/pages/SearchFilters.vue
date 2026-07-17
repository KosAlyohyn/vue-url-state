<script setup>
  import { computed } from 'vue'
  import { useUrlState } from 'vue-url-state'

  const state = useUrlState({
    query: {
      type: 'string',
      defaultValue: '',
    },
    onlyOpen: {
      type: 'boolean',
      defaultValue: false,
    },
    docsOnly: {
      type: 'boolean',
      defaultValue: true,
    },
  })

  const items = [
    {
      id: 1,
      title: 'Open docs item that matches router search',
      category: 'docs',
      status: 'open',
    },
    {
      id: 2,
      title: 'Open issue item that is hidden by docs only',
      category: 'issues',
      status: 'open',
    },
    {
      id: 3,
      title: 'Closed pull request hidden by open filter',
      category: 'pull-requests',
      status: 'closed',
    },
    {
      id: 4,
      title: 'Closed docs item visible when open filter is off',
      category: 'docs',
      status: 'closed',
    },
  ]

  const results = computed(() => {
    const query = state.query.value.trim().toLowerCase()
    const onlyOpen = state.onlyOpen.value
    const docsOnly = state.docsOnly.value

    return items.filter((item) => {
      const matchesQuery = !query || item.title.toLowerCase().includes(query)
      const matchesStatus = !onlyOpen || item.status === 'open'
      const matchesDocs = !docsOnly || item.category === 'docs'

      return matchesQuery && matchesStatus && matchesDocs
    })
  })

  const snapshot = computed(() => JSON.stringify(state.values.value, null, 2))

  function applyDocsPreset() {
    state.patch({
      query: 'router',
      onlyOpen: true,
      docsOnly: true,
    })
  }

  function resetState() {
    state.reset()
  }

  function clearState() {
    state.clear()
  }
</script>

<template>
  <section class="page">
    <header class="page-header">
      <h2>Search filters</h2>
      <p>Basic URL-backed search state with a text query, booleans, and defaults.</p>
    </header>

    <form class="panel" @submit.prevent>
      <label>
        Search query
        <input
          v-model="state.query.value"
          placeholder="Search by title"
        />
      </label>

      <div class="checkbox-row">
        <label class="checkbox">
          <input
            v-model="state.onlyOpen.value"
            type="checkbox"
          />
          Only open
        </label>

        <label class="checkbox">
          <input
            v-model="state.docsOnly.value"
            type="checkbox"
          />
          Docs only
        </label>
      </div>

      <p class="actions">
        <button
          type="button"
          @click="applyDocsPreset"
        >
          Apply docs preset
        </button>
        <button
          type="button"
          @click="resetState"
        >
          Reset filters
        </button>
        <button
          type="button"
          @click="clearState"
        >
          Clear URL params
        </button>
      </p>
    </form>

    <section class="panel">
      <h3>Matching items</h3>
      <ul class="result-list">
        <li
          v-for="item in results"
          :key="item.id"
        >
          <span>{{ item.title }}</span>
          <span>{{ item.category }} / {{ item.status }}</span>
        </li>
      </ul>
    </section>

    <pre>{{ snapshot }}</pre>
  </section>
</template>
