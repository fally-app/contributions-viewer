<template>
  <div>
    <p class="headline">Overall Report</p>
    <div v-if="report">
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="report.rows"
            label="Number of Contributions"
            required
          ></v-text-field>

          <v-text-field
            v-model="report.contributors"
            label="Contributors"
            required
          ></v-text-field>

          <v-text-field
            v-model="report.amount"
            label="Amount"
            required
          ></v-text-field>

        </v-form>
        <div v-for="name in report.conts" class="edit-form py-3" v-bind:key="name.type._id">
           <!-- <p class="headline">{{name.type.title}}</p>
           <v-text-field
            v-model="name.members"
            label="Contributors"
            required
            disabled
          ></v-text-field>
           <v-text-field
            v-model="name.sum"
            label="Amount Contributed"
            required
            disabled
          ></v-text-field> -->
           <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{name.type.title}}</h3>
            <p>Contributors: {{name.members}}</p>
            <p>Amount: {{name.sum}}</p>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="grey">Copy</v-btn>
          <v-btn flat color="grey">Star</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    </div>
      </div>
    <div v-else>
      <p>No report</p>
    </div>
  </div>
</template>

<script>
import ReportDataService from "../../services/ReportDataService";
export default {
  data() {
    return {
      report: null,
      reports: null,
    };
  },
  methods: {
    getReport() {
      ReportDataService.getAll()
        .then((response) => {
          console.log(response.data)
          this.report = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteReport(id) {
      ReportDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAmount(arr) {
      let amount = 0;
      arr.forEach((element) => {
        amount += element.amount;
      });
      return amount;
    },
  },
  mounted() {
    this.getReport();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>
