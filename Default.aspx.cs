using System;
using System.Text;
using System.Web.UI;

namespace MultiTextTableDesigner
{
    /// <summary>
    /// Main ASP.NET Web Forms page for the text and table designer.
    /// The original browser-side editor and document parsing features remain client-side.
    /// </summary>
    public partial class Default : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // Keep the HTML response encoded as UTF-8 for Indonesian text and Unicode symbols.
            Response.ContentEncoding = Encoding.UTF8;
            Response.Charset = "utf-8";
        }
    }
}
