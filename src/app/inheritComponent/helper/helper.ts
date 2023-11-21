import Swal from 'sweetalert2';

export function formatDate(date:any): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2){
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return [year, month, day].join('-');
}

export function sweetAlert(rules: any): any {
    Swal.fire({
      title: rules.title,
      text: rules.text,
      html: rules.html,
      icon: rules.icon,
      showCancelButton: rules.showCancelButton,
      confirmButtonColor: rules.confirmButtonColor,
      cancelButtonColor: rules.cancelButtonColor,
      confirmButtonText: rules.confirmButtonText || 'OK'
    }).then((result: any) => {
        if (result.isConfirmed) {
            if (rules.action){
                return rules.action(result);
            }else{
                return true;
            }
        }
    });
}

export function checkEmailFormat(email: string): any {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
}

export function compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

export function numberPad(number: number, limit = 2) {
    const str = number.toString();
    const pad = '00';
    return pad.substring(0, limit - str.length) + str;
}