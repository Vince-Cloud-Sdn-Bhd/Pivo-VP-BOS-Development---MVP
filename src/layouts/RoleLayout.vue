<script setup lang="ts">
import {computed} from 'vue'
import {useSession} from '../stores/session'
import AppShell from './AppShell.vue'
import PortalShell from './PortalShell.vue'
const session=useSession()
const staff=computed(()=>['admin','coordinator','finance_preparer','finance_approver','finance_executor','leadership','relationship_manager'].includes(session.activePersona?.activeRole??''))
</script>
<template><AppShell v-if="staff"/><PortalShell v-else/></template>
