import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
<<<<<<< HEAD
  props: ['chartData', 'options'],
=======
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
>>>>>>> main
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}
