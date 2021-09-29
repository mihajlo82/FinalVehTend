using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DataTransferObjects
{
    public class StockInfoDetailsDTO
    {
        public int Id { get; set; }
        public string RegNo { get; set; }
        public string Year { get; set; }
        public string Make { get; set; }
        public string Carline { get; set; }
        public string Model { get; set; }
        public string Mileage { get; set; }
        public string Cost { get; set; }
        public string Comments { get; set; }
        public string Location { get; set; }

    }
}
