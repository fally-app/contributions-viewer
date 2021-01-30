<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>
          Contributions
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="contributions"
          :search="search"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editContribution(item.id)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deleteContribution(item.id)"
              >mdi-delete</v-icon
            >
          </template>
        </v-data-table>
        <!-- <v-data-table
          :headers="headers"
          :items="members"
          disable-pagination
          :hide-default-footer="false"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editMember(item.id)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deleteMember(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table> -->

        <v-card-actions v-if="contributions.length > 0">
          <v-btn small color="error" @click="removeAllContributions">
            Remove All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ContributionDataService from "../../services/ContributionDataService";
export default {
  name: "contributions",
  data() {
    return {
      contributions: [],
      member: "",
      c_type:"",
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "member",
        },
        { text: "Type", value: "c_type", sortable: true },
        { text: "Date", value: "date", sortable: true },
        { text: "Amount", value: "amount", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveContributions() {
      ContributionDataService.getAll()
        .then((response) => {
          console.log(response.data)
          this.contributions = response.data.map(this.getDisplayContribution);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveContributions();
    },

    removeAllContributions() {
      ContributionDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchName() {
      ContributionDataService.findByName(this.member)
        .then((response) => {
          this.members = response.data.map(this.getDisplayContribution);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editContribution(id) {
      this.$router.push({ name: "contribution_details", params: { id: id } });
    },

    deleteContribution(id) {
      ContributionDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayContribution(contribution) {
      return {
        id: contribution._id,
        member:
          contribution.member.fname.length > 30
            ? contribution.member.fname.substr(0, 30) + "..."
            : contribution.member.fname,
        c_type:
          contribution.c_type?.title?.length > 30
            ? contribution.c_type?.title?.substr(0, 30) + "..."
            : contribution.c_type?.title,

        amount:
          contribution.amount.length > 30
            ? contribution.amount.substr(0, 30) + "..."
            : contribution.amount,

        createdAt:
          contribution.createdAt.length > 10
            ? contribution.createdAt.substr(0, 10)
            : contribution.createdAt,

        date: 
           contribution.date.length > 10
            ? contribution.date.substr(0, 10)
            : contribution.date,
      };
    },
  },
  mounted() {
    this.retrieveContributions();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>
