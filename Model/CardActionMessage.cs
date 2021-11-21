namespace Centigrade.VedaVersum.Model
{
    /// <summary>
    /// Represents the data for Card changed action
    /// </summary>
    public class CardActionMessage
    {
        /// <summary>
        /// Changed card
        /// </summary>
        public VedaVersumCard? VedaVersumCard { get; set; }

        /// <summary>
        /// Card action
        /// </summary>
        public VedaVersumCardAction Action { get; set; }
    }
}