<template>
    <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card dark color="blue-grey darken-3">
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-grey lighten-1" dark @click="dialog_Coles">Cancel</v-btn>
            <v-btn color="blue-grey lighten-1" dark @click="deleteItemConfirm">OK</v-btn>
            <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'deldialogbox',
    props:{
        dialogDelete: Boolean,
    },
    data: () => ({
        }),
    methods: {
        dialog_Coles()
        {
            this.$emit('dialog_Coles')
        },
        deleteItemConfirm(){
            this.$emit('deleteItemConfirm')
        }
    }
}
</script>