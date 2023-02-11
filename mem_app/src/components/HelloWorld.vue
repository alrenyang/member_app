<template>
  <div>
    <v-container fluid class="pa-md-1">
      <v-row>
        <v-col>
          <v-card color="grey darken-4" class="pa-md-1">
            <v-toolbar dense flat color="grey darken-4" class="pa-1" dark>
              <v-toolbar-title class="font-weight-black">고객 정보 관리</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="grey darken-2" dark @click="dialogOpen(Edit_Save_Flag=true)">
              고객 정보 추가
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-data-table :headers="headers" :items-per-page="5" :items= "items" dark dense >
                <template v-slot:item.date="{ item }">
                  <span>{{ item.date }}</span>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click="dialogOpen(item, Edit_Save_Flag=false)">
                    mdi-pencil
                  </v-icon>
                  <v-icon small @click="dialogDelOpen(item)">
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-dialog v-model="dialogFlag" max-width="500px">
        <v-card dark color="blue-grey darken-3">
          <v-card-text>
            <v-container>
              <v-card-title  class="font-weight-black text-h3 px-1">{{ formTitle }}</v-card-title>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                  <v-text-field :rules="rules" dark v-model="defaultItem.Name" label="고객이름"> </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field dark v-model="defaultItem.Number"  label="연락처(핸드폰)"> </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field dark v-model="defaultItem.Contact"  label="담당자"> </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field dark v-model="defaultItem.Store"  label="매장"> </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field dark v-model="defaultItem.Date" :disabled = false label="방문날자(년도/날자/시간)"> </v-text-field>
                  </v-col>
                </v-row>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue-grey lighten-1" dark @click="dialog_Save">저장</v-btn>
                  <v-btn color="blue-grey lighten-1" dark @click="dialog_Coles">취소</v-btn>
                </v-card-actions>

            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>

    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      dialogFlag: false,
      Edit_Save_Flag: false,
      Edit_Save_Flag: false,
      dialogTitle: '고객 정보 등록',

      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 1) || 'Min 3 characters',
      ],

      headers:[
        {
          text: '고객이름',
          align: 'start',
          sortable: true,
          value: 'Name',
        },
        { text: '연락처(핸드폰)', value: 'Number' },
        { text: '담당자', value: 'Contact' },
        { text: '매장', value: 'Store' },
        { text: '방문날자(년도/날자/시간)', value: 'Date' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      items:[
        {
          Name: '홍길동',
          Number:'010-1234',
          Contact: '홍길동',
          Store: '잠실',
          Date: '2023-02-10'
        },
        {
          Name: '홍길동',
          Number:'010-1234',
          Contact: '홍길동',
          Store: '잠실',
          Date: '2023-02-10'
        },
          
      ],
      selectitems:[],
      defaultItem: {
          Name: '',
          Number:'',
          Contact: '',
          Store: '',
          Date: ''
      },
      NullItem: {
          Name: '',
          Number:'',
          Contact: '',
          Store: '',
          Date: ''
      },
    }),
    computed: {
      formTitle () {
        return this.dialogTitle
      }
    },
    methods: {
      dialogOpen(item, Edit_Save_Flag){
        // this.defaultItem.date = this.$dayjs().format('YYYY-MM-DD HH:mm:ss')
        if(Edit_Save_Flag==true){
          this.dialogTitle='New Item'
        }
        if(Edit_Save_Flag==false){
          this.defaultItem = item
          this.dialogTitle='Edit Item'
        }
        this.dialogFlag = true
      },
      dialog_Coles(){
        this.defaultItem = Object.assign({}, this.NullItem)
        this.selectitems = Object.assign({}, this.NullItem)
        this.dialogFlag = false
        this.dialogDelete = false
      },

      dialog_Save(){
        if(this.Edit_Save_Flag==true){
          console.log(this.defaultItem)
          this.defaultItem = Object.assign({}, this.NullItem)
        }
        if(this.Edit_Save_Flag==false){
          this.defaultItem = Object.assign({}, this.NullItem)
        }
        this.dialogFlag = false
      },

    }
  }
</script>
