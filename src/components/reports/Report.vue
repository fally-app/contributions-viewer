<template>
  <div>
    <p class="headline">Overall Report</p>
    <div v-if="report">
      <!-- <div v-for="name in reports" class="edit-form py-3" v-bind:key="name._id"> -->
        <!-- <p>{{ report.amount }}</p> -->
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
          <p>{{ report.rows }}</p>

          <v-divider class="my-5"></v-divider>
        </v-form>
      </div>
    <!-- </div> -->
    <!-- <div v-else>
      <p>No report</p>
    </div> -->
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
