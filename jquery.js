$(document).ready(function() {
  var $checkboxes = $('input[type="checkbox"]');
$("input:checkbox").change(function(){
  var total     = 0;
  var timbre    = 0;
  var tfacture  ="";
  var tperiode  ="";
  var techeance ="";
  var montant   ="";
  var frais     = 0;
  var frais_plus_timbre =0;
  var  total_plus_frais_plus_timbre = total + frais_plus_timbre;
  var ttype ="";
  var n_contrat = $(".data").attr("n-contrat");
  var nom = $(".data").attr("nom");
  var numbers = $checkboxes.filter(':checked').length;
        
      $("input:checkbox:checked").each(function(){
            
      total += isNaN(parseFloat($(this).attr("prix"))) ? 0 : parseFloat($(this).attr("prix"));
      timbre = (total*0.25)/100;
      frais_plus_timbre  = (total*0.25)/100 + (numbers *0.70);
      tfacture += $(this).attr("n-facture") + ("|");
      tperiode += $(this).attr("periode") + ("|");
      techeance += $(this).attr("echeance") + ("|");
      montant += $(this).attr("montant") + ("|");
      ttype += $(this).attr("type_contrat") + ("|");
      total_plus_frais_plus_timbre = total + frais_plus_timbre;
      });  
      var ptotal = total.toFixed(2); 
      var dtimbre = timbre.toFixed(2); 
       total_plus_frais_plus_timbre =  total_plus_frais_plus_timbre.toFixed(2);
      frais_plus_timbre = frais_plus_timbre.toFixed(2);
      $(".total").html(ptotal);
      $(".frais_plus_timbre").html(frais_plus_timbre);
      $(".total_plus_frais_plus_timbre").html( total_plus_frais_plus_timbre);
      // $(".tfacture").html(tfacture);
      // $(".tperiode").html(tperiode);
      // $(".techeance").html(techeance);
      // $(".montant").html(montant);
      $(".data").val(n_contrat +","+ nom + "," + tfacture +"," + tperiode +"," + techeance +"," + montant +","+ ttype + ","+ ptotal + "," + dtimbre + "," + numbers);
}); 
});
/*--------------------------------------------*/
  function selectOldBills(checkedValue)
{
  var check = document.getElementById("check");
  if(check != null)
    check.checked=false;
  var arts = document.getElementsByName("cselectt");
  var artslenght = arts.length;
  if(artslenght>30){
    artslenght = 30;}
  for(var i=0; i<artslenght; i++) {
    arts[i].checked  = true;
    if(check != null && i==artslenght-1){
      check.checked=true;
      break;
    }
    if(checkedValue==arts[i].value){
      for(var j=i+1; j<artslenght; j++) {
        arts[j].checked  = false;
      }
      break;
    }
  }
  
}

function checkOnlyOld(checkedValue)
{
  var check = document.getElementById("check");
  var arts = document.getElementsByName("cselectt");
  var artslenght = arts.length;
  if(artslenght>30){
    artslenght = 30;}
  for(var i=0; i<artslenght; i++) {
    if(checkedValue==arts[i].value){
      arts[i].checked = false;
      for(var j=i+1; j<artslenght; j++) {
        if(arts[j].checked == true){
          alert("Veuillez payer les factures par ordre d'ancienneté !");
          arts[i].checked = true;
          break;
        }
        if(check != null)
          check.checked=false;
      }
      
    }
  }
}
/*------------------------------*/
 $(document).ready(function () {

$("#payer").click(function(e) {
        event.preventDefault();  
        var data     = $('.data').val();
        var username = $('#username').val();
        var password = $('#password ').val();
     // alert(data);
     // alert(username);
     // alert(password);
        $.ajax({
            url: 'process.php',
            type: 'POST',
            data:{ data      : data,
                   username  : username,
                   password  : password 

                },
            success: function (data) {
                $('#process').html(data);

            },
            error: function(data){
            console.log(data);
            alert('Erreur se produit...');
        }
        });
        // return false;
    });
});
