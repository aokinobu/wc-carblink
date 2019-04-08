import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-location/iron-location.js';

class GlyconaviCarbLink extends PolymerElement {
  static get template() {
    return html`
<style type="text/css">

.glyconavi_table_01{

}
.glyconavi_table_01 th{
width: 25%;
padding: 6px;
text-align: left;
vertical-align: top;
color: #333;
background-color: #eee;
border: 0.5px solid whitesmoke;
}
.glyconavi_table_01 td{
padding: 6px;
background-color: #fff;
border: 0.5px solid whitesmoke;
}

.glyconavi_table_tfoot tfoot{
border: 0px;
}
.glyconavi_table_tfoot tr{
border: 0px;
}
.glyconavi_table_tfoot td{
border: 0px;
text-align: right;
}
.glyconavi_table_radio td{
	text-align: left;
	width: 200;
}
.glyconavi_table_radio tr{
	text-align: left;
	width: 200;
}


</style>

<!-- 表示非表示切り替え -->
<script type="text/javascript">

//オンロードさせ、リロード時に選択を保持
window.onload = "entryChange1";
</script>

<iron-location path="{{path}}" hash="{{hash}}" query="{{query}}" dwell-time="{{dwellTime}}"></iron-location>
<iron-ajax auto="" url="https://test.sparqlist.glyconavi.org/api/PDB-wc-carblink?[[query]]" handle-as="json" last-response="{{resultdata}}"></iron-ajax>
<div>
  <table class="glyconavi_table_01">
  <caption>
    <b><a href="http://wwpdb.org/" target="_blank">Protein Data Bank</a></b>
    <small><a href="http://rdf.wwpdb.org/pdb/" target="_blank">RDF</a></small>
    <details>
      <summary>Notes</summary>
      <p>GlyTouCan provides Accession Number for a carbohydrate moiety of a glycan structure. These links may not be a link with a complete chemical structure.</p>
    </details>
  </caption>
  <tr>
    <td class="glyconavi_table_radio" rowspan="5"  width="120" id="radiocontainer" >
      <label><input type="radio" name="entryPlan" id="entryPlan" value="PDBj" on-click="entryChange1" checked="checked" />PDBj</label></br>
      <label><input type="radio" name="entryPlan" id="entryPlan" value="PDBe" on-click="entryChange1" />PDBe</label></br>
      <label><input type="radio" name="entryPlan" id="entryPlan" value="RCSB" on-click="entryChange1" />RCSB PDB</label>
    </td>
    <!-- 表示非表示切り替え -->
    <tr>
      <td><a href="http://wwpdb.org/data/ccd" target"_blank" >Chemical Component</a></td>
    </tr>
    <tr>
      <td id="firstCCBox">
        <!-- PDBj -->
        <template is="dom-repeat" items="[[resultdata]]">
          <a href="http://pdbj.org/chemie/summary[[item.pdbid]]" target="_blank">[[item.pdbid]]</a>
        </template>
      </td>
      <td id="secondCCBox">
				<!-- PDBe -->
        <template is="dom-repeat" items="[[resultdata]]">
					<a href="http://www.ebi.ac.uk/pdbe-srv/pdbechem/chemicalCompound/show/[[item.pdbid]]" target="_blank">[[item.pdbid]]</a>
        </template>
			</td>
      <td id="thirdCCBox">
				<!-- RCSB PDB -->
        <template is="dom-repeat" items="[[resultdata]]">
					<a href="http://www.rcsb.org/pdb/ligand/ligandsummary.do?hetId=[[item.pdbid]]" target="_blank">[[item.pdbid]]</a>
        </template>
			</td>
    </tr>
<!--
    <tr>
			<td>Entry</td>
		</tr>

		<tr>
			<td id="firstBox">
				<a href="http://www.pdbj.org/pdb/7RSA" target="_blank">7RSA</a>
			</td>

			<td id="secondBox">
				<a href="http://www.ebi.ac.uk/pdbe/entry/pdb/7RSA" target="_blank">7RSA</a>
			</td>

			<td id="thirdBox">
				<a href="http://www.rcsb.org/pdb/explore.do?structureId=7RSA" target="_blank">7RSA</a>
			</td>
		</tr>
-->
  </tr>
  <tfoot class="glyconavi_table_tfoot">
    <tr>
	    <td colspan="2"><small>from <a href="http://glyconavi.org" target="_blank">GlycoNAVI</a></small></td>
    </tr>
  </tfoot>
</table>
</div>
`;
  }
  constructor() {
    super();
  }
  static get properties() {
    return {
      resultdata: {
        notify: true,
        type: Object,
        value: function () {
          return new Object();
        }
      },
      iddata: {
        notify: true,
        type: Object,
        value: function () {
          return new Object();
        }
      }

    };
  }

  _handleAjaxPostResponse(e) {
    console.log(e);
  }
  _handleAjaxPostError(e) {
    console.log('error: ' + e);
  }
  retrieveId(query) {
    console.log(query);
    var params = query.split("=");

    return params[1];
  }

  entryChange1() {
    console.log("entryChange1");
    var radio = this.shadowRoot.querySelector('#radiocontainer');
    console.log(radio);
    if (radio[0].checked) {
      this.shadowRoot.getElementById('firstCCBox').style.display = "";
      this.shadowRoot.getElementById('secondCCBox').style.display = "none";
      this.shadowRoot.getElementById('thirdCCBox').style.display = "none";
      this.shadowRoot.getElementById('firstBox').style.display = "";
      this.shadowRoot.getElementById('secondBox').style.display = "none";
      this.shadowRoot.getElementById('thirdBox').style.display = "none";
    } else if (radio[1].checked) {
      this.shadowRoot.getElementById('firstCCBox').style.display = "none";
      this.shadowRoot.getElementById('secondCCBox').style.display = "";
      this.shadowRoot.getElementById('thirdCCBox').style.display = "none";
      this.shadowRoot.getElementById('firstBox').style.display = "none";
      this.shadowRoot.getElementById('secondBox').style.display = "";
      this.shadowRoot.getElementById('thirdBox').style.display = "none";

    } else if (radio[2].checked) {
      this.shadowRoot.getElementById('firstCCBox').style.display = "none";
      this.shadowRoot.getElementById('secondCCBox').style.display = "none";
      this.shadowRoot.getElementById('thirdCCBox').style.display = "";
      this.shadowRoot.getElementById('firstBox').style.display = "none";
      this.shadowRoot.getElementById('secondBox').style.display = "none";
      this.shadowRoot.getElementById('thirdBox').style.display = "";
    }
  }
}

customElements.define('wc-carblink', GlyconaviCarbLink);