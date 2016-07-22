## Tagesspiegel Causa Data Set
* inlcuded in this zip archive are data sets of 10 different debates
* there are nearly complete sets where most authors voted and sets where the majority didn't vote
* every debate has its own .json file
* the file 'all_debates.json' includes all 10 debates

### Simple Data Explanation
* every debate is related to one topic
* every article is related to one debate
* every article has one or more authors
* every author can belong to an organisation
* every thesis belongs to one or more articles of the same debate
* every vote belongs to one author and one thesis
* votes are not mandatory -> not every thesis in one debate is voted by every author

### Json Format
``` {
    "topics": //list of all topics
	{
		"1cd5ba9aa3644fa831670b85ae5dc72e": //hash of this topic
		{
			"title":"Politik"
		}
	},
	"debates": //list of all debates
	{
		"b99c774cd67e046c110f8e6580bacfb1": //hash of this debate
			{
				"title":"<title of debate>",
				"teaser":"<teaser of debate>",
				"published": //publication date
				{
					"date":"2015-11-16 14:29:37",
					"timezone_type":3,
					"timezone":"Europe\/Berlin"
				},
				"topic":"<hash of related topic>"
			}
	},
	"articles": //list of all articles
	{
		"6a1f32562b82ba821b3606a08e4e517d": //hash of this article
		{
			"headline":"<headline of article>",
			"subheadline":"<subheadline of article>",
			"teaser":"<teaser of article>",
			"text":" "<complete text of article with HTML markup and position of related thesis (via thesis hash)>",
			"published": //publication date of article
			{
				"date":"2015-11-23 15:00:22",
				"timezone_type":3,
				"timezone":"Europe\/Berlin"
			},
			"author":"<hash of author of this article>",
			"debate":"<hash of related debate>"
		}
	},
	"authors": //list of all authors
	{
		"c8ee7e8ed82000e4770d410ee3c855d0": //hash of this author
		{
			"first_name":"<first name of author>",
			"last_name":"<last name of author>",
			"organisation":"<hash of related organisation>",
			"images":
			{
				"original":"<relative path to original image>",
				"thumbnail":"<relative path to thumbnail - 120x120",
				"landscape":"<relative path to landscape - 306x172>",
				"portrai":"<relative path to portrait - 145x198>",
			}
		}
	},
	"organisations": //list of all organisations
	{
		"d619c74f3715e4aee45b7cd86bef099d": //hash of this organisation
		{
			"name":"<name of this organisation>"
		}
	},
	"theses": //list of all thesis
	{
		"21ca866f08d30d266ecd364e64d2aaf0": //hash of this thesis
		{
			"text":"<text of thesis, max 120 characters>",
			"created_by":"<hash of the author who created this thesis first>",
			"debate":"<hash of related debate>",
		}
	},
	"votes": //list of all votes
	[
		{
			"author":"<hash of author who voted>",
			"thesis":"<hash of thesis which was voted>",
			"debate":"<hash of debate in which this thesis was voted>",
			"vote":"<[-1,0,1]>",
			"date": //when the author voted this thesis
			{
				"date":"2015-11-24 17:21:45",
				"timezone_type":3,
				"timezone":"Europe\/Berlin"
			}
		}
	],
	"articles_theses": //list of relations: which theses are in which articles
	[
		{
			"article":"<hash of article>",
			"thesis":"<hash of thesis>"
		}
	]
}
```
