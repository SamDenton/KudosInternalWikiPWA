namespace KudosWiki.Shared
{
    public class ContentObject
    {
        public string page;
        public string section;
        public string content;

        public ContentObject(string page, string section, string content)
        {
            this.page = page;
            this.section = section;
            this.content = content;
        }

        public ContentObject() { }

        public string pageID
        {
            get { return page; }
            set { page = value; }
        }

        public string sectionID
        {
            get { return section; }
            set { section = value; }
        }
        public string contentID
        {
            get { return content; }
            set { content = value; }
        }
    }
}
