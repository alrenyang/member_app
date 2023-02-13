<template>
  <div>
    <v-container fluid class="pa-md-1">
      <v-row>
        <v-col>
          <v-card color="grey darken-4" class="pa-md-1">
            <v-toolbar dense flat color="grey darken-4" class="pa-1" dark>
              <v-toolbar-title class="font-weight-black">고객 정보 관리</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                class="pr-md-5"
              ></v-text-field>
              <v-btn color="#263238" class="pa-md-1" dark @click="dialogOpen(Edit_Save_Flag=true)">
              고객 정보 추가
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-data-table :headers="headers" :items-per-page="10" :items= "items"  :search="search" dark dense >
                <template v-slot:item.date="{ item }">
                  <span>{{ item.date }}</span>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click="dialogOpen(item, Edit_Save_Flag=false)">
                    mdi-pencil
                  </v-icon>
                  <v-icon small color="purple" @click="dialogDelOpen(item)">
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
              <v-card-title sm="6" md="4" class="font-weight-black text-h3 px-1">{{ formTitle }}</v-card-title>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                  <v-text-field :rules="rules" dark v-model="defaultItem.Name" label="고객이름"> </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field dark v-model="defaultItem.Number"  label="연락처(핸드폰)"> </v-text-field>
                  </v-col>
                  <v-col cols="6" sm="4" md="3">
                    <v-text-field dark v-model="defaultItem.Contact"  label="담당자"> </v-text-field>
                  </v-col>
                  <v-col cols="6" sm="4" md="3">
                    <v-text-field dark v-model="defaultItem.Store"  label="매장"> </v-text-field>
                  </v-col>
                  <v-col cols="6" sm="4" md="3">
                    <v-text-field dark v-model="defaultItem.Date" :disabled = false label="방문날자(년도/날자/시간)"> </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="11">
                    <v-text-field dark v-model="defaultItem.Memo"  label="메모"> </v-text-field>
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
      <DeletDialogBox :dialogDelete="dialogDelete" @dialog_Coles='dialog_Coles' @deleteItemConfirm = 'deleteItemConfirm'/>
    </v-container>
  </div>
</template>



<script>
import DeletDialogBox from "@/components/DeletDialog.vue"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs, query, where, setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAC7TXF0f8znCcUjLbWgQDGORKyqUfdGLI",
    authDomain: "member-app-d019d.firebaseapp.com",
    databaseURL: "https://member-app-d019d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "member-app-d019d",
    storageBucket: "member-app-d019d.appspot.com",
    messagingSenderId: "479434588375",
    appId: "1:479434588375:web:5b12892a7472b478f77092"
  }

  // Initialize Firebase
const app = initializeApp(firebaseConfig)


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)
let snapshot

  export default {
    name: 'HelloWorld',
    components: { DeletDialogBox },

    data: () => ({
      dialogFlag: false,
      Edit_Save_Flag: false,
      dialogDelete: false,
      dialogTitle: '고객 정보 등록',

      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 1) || 'Min 6 characters',
      ],
      search: '',

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
        { text: '메모', value: 'Memo' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      items:[],
      selectitems:[],
      defaultItem: {
          Name: '',
          Number:'',
          Contact: '',
          Store: '',
          Memo: '',
          Date: ''
      },
      NullItem: {
          Name: '',
          Number:'',
          Contact: '',
          Store: '',
          Memo: '',
          Date: ''
      },
    }),

    async mounted (){
      await this.data_listup()
      // await this.all_Remove()
    },

    computed: {
      formTitle () {
        return this.dialogTitle
      }
    },

    methods: {
      async dialogOpen(item, Edit_Save_Flag){
        // this.defaultItem.date = this.$dayjs().format('YYYY-MM-DD HH:mm:ss')
        if(Edit_Save_Flag==true){
          this.dialogTitle='고객 정보 등록'
        }
        if(Edit_Save_Flag==false){
          this.defaultItem = item
          this.dialogTitle='고객 정보 수정'
          
          console.log("정보수정")
          const q = query(collection(db, "MemberData"), where("Name", "==", this.defaultItem.Name))

          const querySnapshot = await getDocs(q)
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data())
          snapshot = doc.id
          })
        }
        console.log("id",snapshot)
        this.dialogFlag = true
      },

      dialog_Coles(){
        this.defaultItem = Object.assign({}, this.NullItem)
        this.selectitems = Object.assign({}, this.NullItem)
        this.dialogFlag = false
        this.dialogDelete = false
      },

      async dialog_Save(){
        if(this.Edit_Save_Flag==true){
          console.log(this.defaultItem.Name)
          try 
          {
            const docRef = await addDoc(collection(db, "MemberData"), {
            Name: this.defaultItem.Name,
            Number: this.defaultItem.Number,
            Contact: this.defaultItem.Contact,
            Store: this.defaultItem.Store,
            Memo: this.defaultItem.Memo,
            Date: this.defaultItem.Date
            })
            // alert('정상 작성 되었습니다.')
            console.log("Document written with ID: ", docRef.id)
          } catch (e) {
            console.error("Error adding document: ", e)
          }
          this.data_listup()
          this.defaultItem = Object.assign({}, this.NullItem)
        }
        if(this.Edit_Save_Flag==false){
          console.log(this.defaultItem.Name)
          console.log("snapshot",snapshot)

          const washingtonRef = doc(db, "MemberData", snapshot);
          await updateDoc(washingtonRef, {
            Name: this.defaultItem.Name,
            Number: this.defaultItem.Number,
            Contact: this.defaultItem.Contact,
            Store: this.defaultItem.Store,
            Memo: this.defaultItem.Memo,
            Date: this.defaultItem.Date
          })
          this.data_listup()
          this.defaultItem = Object.assign({}, this.NullItem)
        }
        this.dialogFlag = false
      },

      async dialogDelOpen(item){
        this.selectitems = item
        console.log("정보삭제")
        const q = query(collection(db, "MemberData"), where("Name", "==", this.selectitems.Name))

        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data())
        snapshot = doc.id
        })
        console.log("id",snapshot)
        this.dialogDelete = true
      },

      async deleteItemConfirm(){
        await deleteDoc(doc(db, "MemberData", snapshot))
        this.data_listup()
        this.dialog_Coles()
      },

      async data_listup(){
        const querySnapshot = await getDocs(collection(db, "MemberData"))
        this.items.splice(0)
        querySnapshot.forEach((doc) => {
          this.items.push({
            Name: doc.data().Name,
            Number: doc.data().Number,
            Contact: doc.data().Contact,
            Store: doc.data().Store,
            Memo: doc.data().Memo,
            Date: doc.data().Date
          })
          console.log(`${doc.id} => ${doc.data()}`);
        })
      },

    }
  }
</script>
